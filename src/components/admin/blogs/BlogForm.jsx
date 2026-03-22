"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Globe, Loader2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Link from "@/components/ui/NextLink";
import Editor from "./editor/Editor";
import { createBlog, updateBlog } from "@/lib/mock-actions";

const parseContent = (value) => {
    if (!value) return undefined;
    if (typeof value === "object") return value;

    try {
        return JSON.parse(value);
    } catch {
        return {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [{ type: "text", text: value }],
                },
            ],
        };
    }
};

export default function BlogForm({ initialData, isEditing = false }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        status: initialData?.status || "draft",
        featured: initialData?.featured || false,
        cover_image: initialData?.cover_image || "",
        seo_title: initialData?.seo_title || "",
        seo_description: initialData?.seo_description || "",
        content: parseContent(initialData?.content),
    });

    useEffect(() => {
        if (!isEditing && formData.title) {
            setFormData((prev) => ({
                ...prev,
                slug: prev.slug
                    ? prev.slug
                    : formData.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, ""),
            }));
        }
    }, [formData.title, isEditing]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size must be less than 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, cover_image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            content: typeof formData.content === 'object' ? JSON.stringify(formData.content) : formData.content,
        };

        const result = isEditing && initialData
            ? await updateBlog(initialData.id, payload)
            : await createBlog(payload);

        setLoading(false);

        if (!result?.success) {
            toast.error(result?.error || "Failed to save blog");
            return;
        }

        toast.success(isEditing ? "Blog updated successfully" : "Blog created successfully");
        navigate("/admin/blogs");
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-8 pb-20">
            <div className="sticky top-0 z-20 mb-8 flex items-center justify-between border-b border-white/10 bg-background/80 py-4 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{isEditing ? "Edit Blog" : "New Blog"}</h1>
                        <p className="mt-1 font-mono text-xs text-gray-500">Mongo-backed content entry</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {isEditing ? "Save Changes" : "Publish Blog"}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
                        <Field
                            label="Blog Title"
                            value={formData.title}
                            onChange={(value) => setFormData((prev) => ({ ...prev, title: value, slug: isEditing ? prev.slug : "" }))}
                            required
                        />

                        <Field
                            label="Slug URL"
                            value={formData.slug}
                            onChange={(value) => setFormData((prev) => ({ ...prev, slug: value }))}
                            required
                        />

                        <Field
                            label="Excerpt"
                            value={formData.excerpt}
                            onChange={(value) => setFormData((prev) => ({ ...prev, excerpt: value }))}
                            multiline
                        />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
                        <Editor
                            initialContent={formData.content}
                            onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
                        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">Publishing</h3>

                        <label className="block space-y-2">
                            <span className="text-sm font-mono text-gray-400">Status</span>
                            <select
                                value={formData.status}
                                onChange={(event) => setFormData((prev) => ({ ...prev, status: event.target.value }))}
                                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </label>

                        <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                            <div>
                                <p className="text-sm text-white">Featured Blog</p>
                                <p className="font-mono text-xs text-gray-500">Show on homepage</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(event) => setFormData((prev) => ({ ...prev, featured: event.target.checked }))}
                                className="h-4 w-4 accent-primary"
                            />
                        </label>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
                        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">Media</h3>
                        
                        <div className="flex flex-col gap-3 rounded-xl border border-white/10 p-4 bg-black/20">
                            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-4 py-2 text-sm font-mono text-white transition-colors hover:bg-gray-700">
                                <span>Choose Local Cover Image</span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                />
                            </label>
                            <div className="text-center text-xs text-gray-500 font-mono uppercase tracking-widest">or</div>
                            <Field
                                label="Cover Image URL"
                                value={formData.cover_image}
                                onChange={(value) => setFormData((prev) => ({ ...prev, cover_image: value }))}
                                type="text"
                            />
                        </div>

                        {formData.cover_image && (
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 aspect-video">
                                <img src={formData.cover_image} alt="Cover preview" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <p className="font-mono text-xs text-gray-600">
                            Use a public image URL or select a local image (max 2MB).
                        </p>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
                        <h3 className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
                            <Globe className="h-4 w-4" />
                            SEO
                        </h3>
                        <Field
                            label="Meta Title"
                            value={formData.seo_title}
                            onChange={(value) => setFormData((prev) => ({ ...prev, seo_title: value }))}
                        />
                        <Field
                            label="Meta Description"
                            value={formData.seo_description}
                            onChange={(value) => setFormData((prev) => ({ ...prev, seo_description: value }))}
                            multiline
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

function Field({ label, value, onChange, type = "text", required = false, multiline = false }) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-mono text-gray-400">{label}</span>
            {multiline ? (
                <textarea
                    rows={3}
                    required={required}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                />
            ) : (
                <input
                    required={required}
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                />
            )}
        </label>
    );
}
