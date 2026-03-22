const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

// Get blogs with optional search, pagination
export async function getPublishedBlogs(params) {
    try {
        let url = `${API_URL}/blogs?`;
        if (params?.query) url += `search=${encodeURIComponent(params.query)}&`;
        if (params?.page) url += `page=${params.page}&`;
        if (params?.limit) url += `limit=${params.limit}&`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        // Return dummy total since we dont send count headers right now
        return { data: data || [], total: data.length || 0 };
    } catch (err) { console.error(err); return { data: [], total: 0 }; }
}

export async function getAllPublishedBlogs() {
    try {
        const res = await fetch(`${API_URL}/blogs`);
        if (!res.ok) throw new Error('Failed');
        return await res.json() || [];
    } catch (err) { console.error(err); return []; }
}

export async function getFeaturedBlogs() {
    try {
        const res = await fetch(`${API_URL}/blogs?featured=true`);
        if (!res.ok) throw new Error('Failed');
        return await res.json() || [];
    } catch (err) { console.error(err); return []; }
}

export async function getBlogBySlug(slug) {
    try {
        const res = await fetch(`${API_URL}/blogs/${slug}`);
        if (!res.ok) throw new Error('Failed');
        return await res.json() || null;
    } catch (err) { console.error(err); return null; }
}
