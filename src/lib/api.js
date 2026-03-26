const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

const globalCache = {
    projects: null,
    skills: null,
    experience: null,
    certificates: null
};

// Database: Projects
export const getProjects = async () => {
    if (globalCache.projects) return globalCache.projects;
    try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        globalCache.projects = data;
        return data;
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
    if (globalCache.skills) return globalCache.skills;
    try {
        const res = await fetch(`${API_URL}/skills`);
        const data = await res.json();
        globalCache.skills = data;
        return data;
    } catch (err) { console.error(err); return []; }
};

export const getSkillById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/skills/${id}`);
        return await res.json();
    } catch (err) { console.error(err); return null; }
};

export const getExperience = async () => {
    if (globalCache.experience) return globalCache.experience;
    try {
        const res = await fetch(`${API_URL}/experience`);
        const data = await res.json();
        globalCache.experience = data;
        return data;
    } catch(err) { console.error(err); return []; }
};

export const getExperienceById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/experience/${id}`);
        return await res.json();
    } catch(err) { console.error(err); return null; }
};

// Database: Certificates
export const getCertificates = async () => {
    if (globalCache.certificates) return globalCache.certificates;
    try {
        const res = await fetch(`${API_URL}/certificates`);
        const data = await res.json();
        globalCache.certificates = data;
        return data;
    } catch (err) { console.error(err); return []; }
};

export const getCertificateById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/certificates/${id}`);
        return await res.json();
    } catch (err) { console.error(err); return null; }
};

export const getAdminExperience = async () => {
    try {
        const res = await fetch(`${API_URL}/experience`);
        return await res.json();
    } catch(err) { console.error(err); return []; }
};
