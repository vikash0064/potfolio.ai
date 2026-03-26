const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export const incrementView = async (slug) => {
    try {
        await fetch(`${API_URL}/blogs/${slug}`);
    } catch (e) { console.error(e); }
};

export const trackView = async () => {};
export const trackVisitor = async () => {};

export const restoreItem = async (type, id) => {
    return await fetch(`${API_URL}/admin/restore`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ type, id }) });
};

export const permanentDelete = async (type, id) => {
    return await fetch(`${API_URL}/admin/trash/${type}/${id}`, { method: 'DELETE' });
};

export const getAnalyticsSummary = async () => {
    try {
        const res = await fetch(`${API_URL}/admin/analytics`);
        return await res.json();
    } catch(e) { return { views: 0, visitors: 0, likes: 0 }; }
};

export const getLogs = async () => {
    try {
        const res = await fetch(`${API_URL}/admin/logs`);
        return await res.json();
    } catch(e) { return []; }
};

export const getTrashItems = async () => {
    try {
        const res = await fetch(`${API_URL}/admin/trash`);
        return await res.json();
    } catch(e) { return []; }
};

export const login = async () => {};
export const logout = async () => {};

export const updateSkill = async (id, data) => {
    const res = await fetch(`${API_URL}/skills/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};
export const createSkill = async (data) => {
    const res = await fetch(`${API_URL}/skills`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

export const updateProject = async (id, data) => {
    const res = await fetch(`${API_URL}/projects/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};
export const createProject = async (data) => {
    const res = await fetch(`${API_URL}/projects`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

export const updateExperience = async (id, data) => {
    const res = await fetch(`${API_URL}/experience/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};
export const createExperience = async (data) => {
    const res = await fetch(`${API_URL}/experience`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

// Removed empty getTrashItems

export const publishBlog = async (data) => {
    const res = await fetch(`${API_URL}/blogs`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

export const deleteBlog = async (id) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, { method: 'DELETE' });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

export const createBlog = async (data) => {
    const res = await fetch(`${API_URL}/blogs`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

export const updateBlog = async (id, data) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};

export const toggleFeatured = async (id) => {
    // Just a mock for toggling
    console.log("Toggled feature for", id);
};

export const deleteSkill = async (id) => {
    await fetch(`${API_URL}/skills/${id}`, { method: 'DELETE' });
};

export const deleteProject = async (id) => {
    await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
};

export const deleteExperience = async (id) => {
    await fetch(`${API_URL}/experience/${id}`, { method: 'DELETE' });
};

export const getBlog = async (id) => {
    const res = await fetch(`${API_URL}/blogs/${id}`);
    if (res.ok) return await res.json();
    return null;
};

export const getBlogs = async () => {
    const res = await fetch(`${API_URL}/blogs?all=true`);
    if (res.ok) return await res.json();
    return [];
};

export const updateCertificate = async (id, data) => {
    const res = await fetch(`${API_URL}/certificates/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};
export const createCertificate = async (data) => {
    const res = await fetch(`${API_URL}/certificates`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    if(res.ok) return { success: true };
    return { success: false, error: 'Failed' };
};
export const deleteCertificate = async (id) => {
    await fetch(`${API_URL}/certificates/${id}`, { method: 'DELETE' });
};

export const uploadImage = async () => ({ url: '' });
