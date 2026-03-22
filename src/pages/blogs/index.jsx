import React, { useEffect, useState } from 'react';
import { getPublishedBlogs } from '@/lib/api/blogs';
import BlogsList from '@/components/blogs/BlogsList';
import Link from '@/components/ui/NextLink';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
export default function BlogsPage() {
    const [searchParams] = useSearchParams();
    const sortParam = searchParams.get('sort');
    const qParam = searchParams.get('q');
    const pageParam = searchParams.get('page');
    const sortBy = typeof sortParam === 'string' ? sortParam : 'latest';
    const query = typeof qParam === 'string' ? qParam : '';
    const page = typeof pageParam === 'string' ? parseInt(pageParam) : 1;
    const limit = 9;
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        async function fetchBlogs() {
            const { data, total } = await getPublishedBlogs({ sortBy, query, page, limit });
            setBlogs(data || []);
            setTotal(total || 0);
        }
        fetchBlogs();
    }, [sortBy, query, page]);
    return (<div className="min-h-screen bg-black pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="max-w-4xl mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8 group font-mono">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/>
                        Back to Home
                    </Link>

                    <div className="flex flex-col gap-2 mb-6">
                        <h2 className="text-primary tracking-widest text-sm font-semibold uppercase">
                            Knowledge Base & Insights
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-white">
                            Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Blogs</span>
                        </h1>
                    </div>

                    <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                        Deep dives into system architecture, frontend performance, and the journey of building software products.
                    </p>
                </div>

                {/* Interactivity wrapper */}
                {blogs.length > 0 ? (<BlogsList initialBlogs={blogs} total={total} currentPage={page} limit={limit}/>) : (<div className="text-gray-500">Loading blogs...</div>)}
            </div>
        </div>);
}
