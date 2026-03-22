const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

// Database: Projects
export const getProjects = async () => {
    try {
        const res = await fetch(`${API_URL}/projects`);
        return await res.json();
    } catch (err) { console.error(err); return []; }
};

export const getProjectById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/projects/${id}`);
        return await res.json();
    } catch (err) { console.error(err); return null; }
};

// Database: Skills
export const getSkills = async () => {
    try {
        const res = await fetch(`${API_URL}/skills`);
        return await res.json();
    } catch (err) { console.error(err); return []; }
};

export const getSkillById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/skills/${id}`);
        return await res.json();
    } catch (err) { console.error(err); return null; }
};

export const getExperience = async () => {
    try {
        const res = await fetch(`${API_URL}/experience`);
        return await res.json();
    } catch(err) { console.error(err); return []; }
};

export const getExperienceById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/experience/${id}`);
        return await res.json();
    } catch(err) { console.error(err); return null; }
};

export const getAdminExperience = async () => {
    try {
        const res = await fetch(`${API_URL}/experience`);
        return await res.json();
    } catch(err) { console.error(err); return []; }
};
