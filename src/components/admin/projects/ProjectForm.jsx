'use client';
import { useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/NextImage';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ProjectForm({ initialData, action }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        tags: initialData?.tags?.join(', ') || '',
        image: initialData?.image || '',
        link: initialData?.link || '',
        github: initialData?.github || '',
        order_index: initialData?.order_index || 0,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Optional: limit file size, e.g., 2MB
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size must be less than 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()),
            order_index: Number(formData.order_index || 0),
        };

        const result = await action(payload);
        setSubmitting(false);

        if (!result?.success) {
            toast.error(result?.error || 'Failed to save project');
            return;
        }

        toast.success(initialData ? 'Project updated successfully' : 'Project created successfully');
        navigate('/admin/projects');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-1">
                    <label className="block text-sm font-mono text-gray-400">Project Thumbnail</label>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-dashed border-white/10 bg-black/30">
                        {formData.image ? (
                            <Image src={formData.image} alt="Project preview" fill className="object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center px-6 text-center font-mono text-xs text-gray-600">
                                Image preview will appear here
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-4 py-2 text-sm font-mono text-white transition-colors hover:bg-gray-700">
                            <span>Choose from Local</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="hidden" 
                            />
                        </label>
                        <div className="text-center text-xs text-gray-500 font-mono">OR</div>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))}
                            placeholder="Paste image URL here..."
                            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                        />
                    </div>
                    <p className="font-mono text-xs text-gray-600">
                        Use a public image URL or a local path inside <code>/public</code>.
                    </p>
                </div>

                <div className="space-y-6 lg:col-span-2">
                    <Field
                        label="Project Title"
                        value={formData.title}
                        onChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
                        required
                    />

                    <Field
                        label="Description"
                        value={formData.description}
                        onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                        multiline
                        required
                    />

                    <Field
                        label="Tags (comma separated)"
                        value={formData.tags}
                        onChange={(value) => setFormData((prev) => ({ ...prev, tags: value }))}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field
                            label="Live URL"
                            value={formData.link}
                            onChange={(value) => setFormData((prev) => ({ ...prev, link: value }))}
                            type="url"
                        />
                        <Field
                            label="GitHub URL"
                            value={formData.github}
                            onChange={(value) => setFormData((prev) => ({ ...prev, github: value }))}
                            type="url"
                        />
                    </div>

                    <Field
                        label="Order Index"
                        value={String(formData.order_index)}
                        onChange={(value) => setFormData((prev) => ({ ...prev, order_index: value }))}
                        type="number"
                    />

                    <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-5 py-2 font-mono text-sm text-gray-500 transition-colors hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-primary/90',
                                submitting && 'cursor-not-allowed opacity-60'
                            )}
                        >
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {initialData ? 'Update Project' : 'Create Project'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

function Field({ label, value, onChange, type = 'text', required = false, multiline = false }) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-mono text-gray-400">{label}</span>
            {multiline ? (
                <textarea
                    required={required}
                    rows={5}
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
