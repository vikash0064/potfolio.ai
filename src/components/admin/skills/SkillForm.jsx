'use client';
import { useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const CATEGORIES = ['Frontend', 'Backend', 'Tools', 'Other'];

export default function SkillForm({ initialData, action }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        category: initialData?.category || 'Frontend',
        icon: initialData?.icon || 'Code',
        order_index: initialData?.order_index || 0,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const result = await action({
            ...formData,
            order_index: Number(formData.order_index || 0),
        });

        setSubmitting(false);

        if (!result?.success) {
            toast.error(result?.error || 'Failed to save skill');
            return;
        }

        toast.success(initialData ? 'Skill updated successfully' : 'Skill created successfully');
        navigate('/admin/skills');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
            <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-6">
                <Field
                    label="Skill Name"
                    value={formData.name}
                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                    required
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block space-y-2">
                        <span className="text-sm font-mono text-gray-400">Category</span>
                        <select
                            value={formData.category}
                            onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>

                    <Field
                        label="Icon (Lucide Name)"
                        value={formData.icon}
                        onChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}
                        required
                    />
                </div>

                <Field
                    label="Order Index"
                    value={String(formData.order_index)}
                    onChange={(value) => setFormData((prev) => ({ ...prev, order_index: value }))}
                    type="number"
                />
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-5 py-2 font-mono text-sm text-gray-500 transition-colors hover:text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                        'inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-primary/90',
                        submitting && 'cursor-not-allowed opacity-60'
                    )}
                >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {initialData ? 'Update Skill' : 'Create Skill'}
                </button>
            </div>
        </form>
    );
}

function Field({ label, value, onChange, type = 'text', required = false }) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-mono text-gray-400">{label}</span>
            <input
                required={required}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
            />
        </label>
    );
}
