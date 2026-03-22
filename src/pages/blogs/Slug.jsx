import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogBySlug } from '@/lib/api/blogs';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import Link from '@/components/ui/NextLink';
import BlogContentRenderer from '@/components/blogs/BlogContentRenderer';
import ViewTracker from '@/components/blogs/ViewTracker';
import ReadingProgress from '@/components/blogs/ReadingProgress';
import ShareButtons from '@/components/blogs/ShareButtons';
export default function BlogPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchBlog() {
            if (!slug)
                return;
            const fetchedBlog = await getBlogBySlug(slug);
            if (!fetchedBlog) {
                navigate('/404');
            }
            else {
                setBlog(fetchedBlog);
            }
            setLoading(false);
        }
        fetchBlog();
    }, [slug, navigate]);
    if (loading)
        return <div className="min-h-screen bg-black pt-24 pb-20 text-white flex justify-center">Loading...</div>;
    if (!blog)
        return null;
    return (<div className="min-h-screen bg-black pt-24 pb-20 relative">
            <ReadingProgress />
            <ViewTracker blogId={blog.id}/>

            <article className="max-w-[70ch] mx-auto px-6">
                {/* Back Link */}
                <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/>
                    Back to blogs
                </Link>

                {/* Header */}
                <header className="mb-12 space-y-6">
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-mono border-b border-[#222] pb-8">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4"/>
                            {blog.published_at ? new Date(blog.published_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'Draft'}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4"/>
                            {blog.reading_time || 5} min read
                        </span>
                        <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4"/>
                            {blog.views} views
                        </span>
                    </div>

                    <ShareButtons title={blog.title} slug={blog.slug}/>

                </header>

                {/* Cover Image */}
                {blog.cover_image && (<div className="aspect-video w-full rounded-xl overflow-hidden border border-[#222] bg-[#111] mb-12">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover"/>
                    </div>)}

                {/* Content */}
                <div className="blog-content">
                    <BlogContentRenderer content={blog.content}/>
                </div>

            </article>
        </div>);
}
