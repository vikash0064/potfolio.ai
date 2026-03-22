import { createClient } from '@/lib/supabase/client';

// Get blogs with optional search, pagination
export async function getPublishedBlogs(params) {
    try {
        const supabase = createClient();
        let query = supabase.from('blogs').select('*').eq('status', 'published');
        if (params?.query) {
            query = query.ilike('title', `%${params.query}%`);
        }
        if (params?.page && params?.limit) {
            const from = (params.page - 1) * params.limit;
            const to = from + params.limit - 1;
            query = query.range(from, to);
        }
        const { data, error, count } = await query;
        if (error) throw error;
        return { data: data || [], total: count || (data ? data.length : 0) };
    } catch (err) { console.error(err); return { data: [], total: 0 }; }
}

export async function getAllPublishedBlogs() {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('status', 'published')
            .order('publish_date', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (err) { console.error(err); return []; }
}

export async function getFeaturedBlogs() {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('featured', true)
            .eq('status', 'published')
            .order('publish_date', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (err) { console.error(err); return []; }
}

export async function getBlogBySlug(slug) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();
        if (error) throw error;
        return data || null;
    } catch (err) { console.error(err); return null; }
}
