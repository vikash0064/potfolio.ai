'use client';
import { useState } from 'react';
import { Calendar, Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const dateToInputValue = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
};

export default function ExperienceForm({ initialData, action }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        role: initialData?.role || '',
        company: initialData?.company || '',
        start_date: dateToInputValue(initialData?.start_date),
        end_date: dateToInputValue(initialData?.end_date),
        description: initialData?.description || '',
        is_active: initialData?.is_active ?? true,
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
            toast.error(result?.error || 'Failed to save experience');
            return;
        }

        toast.success(initialData ? 'Experience updated successfully' : 'Experience created successfully');
        navigate('/admin/experience');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-6">
                <Field
                    label="Role"
                    value={formData.role}
                    onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                    required
                />
                <Field
                    label="Company"
                    value={formData.company}
                    onChange={(value) => setFormData((prev) => ({ ...prev, company: value }))}
                    required
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                        label="Start Date"
                        value={formData.start_date}
                        onChange={(value) => setFormData((prev) => ({ ...prev, start_date: value }))}
                        type="date"
                        required
                        icon={Calendar}
                    />
                    <Field
                        label="End Date"
                        value={formData.end_date}
                        onChange={(value) => setFormData((prev) => ({ ...prev, end_date: value }))}
                        type="date"
                        icon={Calendar}
                    />
                </div>

                <Field
                    label="Description"
                    value={formData.description}
                    onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                    multiline
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                        label="Order Index"
                        value={String(formData.order_index)}
                        onChange={(value) => setFormData((prev) => ({ ...prev, order_index: value }))}
                        type="number"
                    />

                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-gray-300">
                        <input
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={(event) => setFormData((prev) => ({ ...prev, is_active: event.target.checked }))}
                            className="h-4 w-4 accent-primary"
                        />
                        Active entry
                    </label>
                </div>
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
                    {initialData ? 'Update Experience' : 'Create Experience'}
                </button>
            </div>
        </form>
    );
}

function Field({ label, value, onChange, type = 'text', required = false, multiline = false, icon: Icon }) {
    return (
        <label className="block space-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-mono text-gray-400">
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {label}
            </span>
            {multiline ? (
                <textarea
                    rows={5}
                    required={required}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                />
            ) : (
                <input
                    required={required}
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition-colors focus:border-primary/40"
                />
            )}
        </label>
    );
}
