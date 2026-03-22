import BlogForm from '@/components/admin/blogs/BlogForm';
import { getBlog, updateBlog } from '@/lib/mock-actions';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBlogPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        getBlog(id).then(data => {
            if (!data) navigate('/admin/blogs');
            else setBlog(data);
        });
    }, [id, navigate]);

    if (!blog) return <div className="p-8 text-white">Loading blog...</div>;

    return <BlogForm initialData={blog} isEditing />;
}
