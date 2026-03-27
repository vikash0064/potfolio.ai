import { blogs as HARDCODED_BLOGS } from '@/data/blogs';

// Get blogs with optional search, pagination
export async function getPublishedBlogs(params) {
    try {
        let filtered = [...HARDCODED_BLOGS];
        
        if (params?.query) {
            const q = params.query.toLowerCase();
            filtered = filtered.filter(b => 
                b.title.toLowerCase().includes(q) || 
                b.excerpt.toLowerCase().includes(q)
            );
        }

        if (params?.sortBy === 'views') {
            filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        } else if (params?.sortBy === 'featured') {
             filtered = filtered.filter(b => b.featured);
        } else {
            // Default latest
            filtered.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
        }

        const page = params?.page || 1;
        const limit = params?.limit || 9;
        const start = (page - 1) * limit;
        const data = filtered.slice(start, start + limit);

        return { data, total: filtered.length };
    } catch (err) { 
        console.error(err); 
        return { data: [], total: 0 }; 
    }
}

export async function getAllPublishedBlogs() {
    return HARDCODED_BLOGS;
}

export async function getFeaturedBlogs() {
    return HARDCODED_BLOGS.filter(b => b.featured);
}

export async function getBlogBySlug(slug) {
    return HARDCODED_BLOGS.find(b => b.slug === slug) || null;
}
