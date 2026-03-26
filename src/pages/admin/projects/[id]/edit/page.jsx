import ProjectForm from '@/components/admin/projects/ProjectForm';
import { updateProject } from '@/lib/mock-actions';
import { getProjectById } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        getProjectById(id).then(data => {
            if (!data) navigate('/admin/projects');
            else setProject(data);
        });
    }, [id, navigate]);

    if (!project) return <div className="p-8 text-white">Loading project...</div>;

    const updateAction = async (formData) => {
        return await updateProject(id, formData);
    };

    return (<div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Edit Project</h1>
                <p className="text-gray-400 font-mono text-xs mt-1">Update project details</p>
            </div>

            <ProjectForm initialData={project} action={updateAction}/>
        </div>);
}
