"use client";
import { useMemo, useState } from "react";
import { Calendar, Edit, Eye, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "@/components/ui/NextLink";
import { deleteBlog, toggleFeatured } from "@/lib/mock-actions";

export default function BlogsTable({ blogs = [] }) {
    const [busyId, setBusyId] = useState(null);
    const items = useMemo(
        () => [...blogs].sort((left, right) => new Date(right.publish_date || 0) - new Date(left.publish_date || 0)),
        [blogs]
    );

    const handleDelete = async (id) => {
        setBusyId(id);
        const result = await deleteBlog(id);
        setBusyId(null);

        if (!result?.success) {
            toast.error(result?.error || "Failed to delete blog");
            return;
        }

        toast.success("Blog deleted");
        window.location.reload();
    };

    const handleToggleFeatured = async (id, current) => {
        setBusyId(id);
        const result = await toggleFeatured(id, !current);
        setBusyId(null);

        if (!result?.success) {
            toast.error(result?.error || "Failed to update featured state");
            return;
        }

        toast.success(current ? "Removed from featured" : "Added to featured");
        window.location.reload();
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-white/10 bg-white/5 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Published</th>
                            <th className="px-6 py-4 text-right">Views</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {!items.length ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center font-mono text-sm text-gray-500">
                                    No blogs found yet.
                                </td>
                            </tr>
                        ) : (
                            items.map((blog) => (
                                <tr key={blog.id} className="hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-white">{blog.title}</p>
                                            <p className="mt-1 font-mono text-xs text-gray-500">/{blog.slug}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-gray-300">
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                                        <span className="inline-flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {blog.publish_date
                                                ? new Date(blog.publish_date).toLocaleDateString()
                                                : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-xs text-gray-400">
                                        <span className="inline-flex items-center gap-2">
                                            <Eye className="h-3.5 w-3.5" />
                                            {blog.views || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleFeatured(blog.id, blog.featured)}
                                                disabled={busyId === blog.id}
                                                className={`rounded-lg p-2 transition-colors ${
                                                    blog.featured
                                                        ? "bg-yellow-400/10 text-yellow-400"
                                                        : "text-gray-500 hover:bg-white/10 hover:text-white"
                                                }`}
                                                title="Toggle featured"
                                            >
                                                <Star className={`h-4 w-4 ${blog.featured ? "fill-current" : ""}`} />
                                            </button>
                                            <Link
                                                href={`/admin/blogs/${blog.id}/edit`}
                                                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                disabled={busyId === blog.id}
                                                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
