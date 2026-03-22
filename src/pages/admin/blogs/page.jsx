import Link from '@/components/ui/NextLink';
import BlogsTable from "@/components/admin/blogs/BlogsTable";
import { getBlogs } from "@/lib/mock-actions";
import { Plus } from "lucide-react";
import { useState, useEffect } from 'react';

export const dynamic = "force-dynamic";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogs().then(data => {
            setBlogs(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-white">Loading blogs...</div>;
    if (!blogs) {
        return <div className="p-8 text-white">Error loading blogs. Please check your connection.</div>;
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Blog Manager
                    </h1>
                    <p className="text-gray-400">
                        Manage your articles, drafts, and publications.
                    </p>
                </div>
                
                <Link href="/admin/blogs/new" className="px-5 py-2.5 bg-primary text-black font-bold font-mono text-sm rounded-none hover:bg-primary/90 transition-all flex items-center gap-2 group">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform"/>
                    Write Post
                </Link>
            </div>

            <BlogsTable initialBlogs={blogs}/>
        </div>
    );
}
