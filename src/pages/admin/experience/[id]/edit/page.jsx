import ExperienceForm from '@/components/admin/experience/ExperienceForm';
import { updateExperience } from '@/lib/mock-actions';
import { getExperienceById } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditExperiencePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        getExperienceById(id).then(data => {
            if (!data) navigate('/admin/experience');
            else setExperience(data);
        });
    }, [id, navigate]);

    if (!experience) return <div className="p-8 text-white">Loading experience...</div>;

    const updateExperienceWithId = async (formData) => {
        await updateExperience(id, formData);
        navigate('/admin/experience');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Edit Experience</h1>
                <p className="text-gray-400 font-mono text-xs mt-1">Update career details</p>
            </div>

            <ExperienceForm initialData={experience} action={updateExperienceWithId} />
        </div>
    );
}
