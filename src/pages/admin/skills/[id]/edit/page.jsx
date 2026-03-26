import SkillForm from '@/components/admin/skills/SkillForm';
import { updateSkill } from '@/lib/mock-actions';
import { getSkillById } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditSkillPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [skill, setSkill] = useState(null);

    useEffect(() => {
        getSkillById(id).then(data => {
            if (!data) navigate('/admin/skills');
            else setSkill(data);
        });
    }, [id, navigate]);

    if (!skill) return <div className="p-8 text-white">Loading skill...</div>;

    const updateSkillWithId = async (formData) => {
        return await updateSkill(id, formData);
    };

    return (<div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Edit Skill</h1>
                <p className="text-gray-400 font-mono text-xs mt-1">Update skill details</p>
            </div>

            <SkillForm initialData={skill} action={updateSkillWithId}/>
        </div>);
}
