"use client";
import { useState } from 'react';
import { Award, Link as LinkIcon, Calendar, Image as ImageIcon, Save, Loader2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function CertificateForm({ initialData, action }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        issuer: initialData?.issuer || '',
        date: initialData?.date || '',
        image: initialData?.image || '',
        link: initialData?.link || '',
        order_index: initialData?.order_index || 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const result = await action({
            ...formData,
            order_index: Number(formData.order_index)
        });

        setSubmitting(false);

        if (!result?.success) {
            toast.error(result?.error || 'Failed to save certificate');
            return;
        }

        toast.success(initialData ? 'Certificate updated' : 'Certificate created');
        navigate('/admin/certificates');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Fields */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-6">
                        <Field 
                            label="Certificate Title"
                            placeholder="e.g. Meta Frontend Developer Professional Certificate"
                            value={formData.title}
                            onChange={(v) => setFormData({...formData, title: v})}
                            required
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field 
                                label="Issuing Authority"
                                placeholder="e.g. Coursera / Meta"
                                value={formData.issuer}
                                onChange={(v) => setFormData({...formData, issuer: v})}
                                icon={Award}
                            />
                            <Field 
                                label="Date / Duration"
                                placeholder="e.g. June 2023"
                                value={formData.date}
                                onChange={(v) => setFormData({...formData, date: v})}
                                icon={Calendar}
                            />
                        </div>

                        <Field 
                            label="Verification Link (URL)"
                            placeholder="https://coursera.org/verify/..."
                            value={formData.link}
                            onChange={(v) => setFormData({...formData, link: v})}
                            icon={LinkIcon}
                        />

                        <Field 
                            label="Display Order Index"
                            type="number"
                            value={String(formData.order_index)}
                            onChange={(v) => setFormData({...formData, order_index: v})}
                        />
                    </div>
                </div>

                {/* Image Upload/Preview */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                        <label className="text-sm font-mono text-gray-400 block mb-2">Certificate Image</label>
                        
                        <div className="aspect-[4/3] w-full bg-[#111] border-2 border-dashed border-white/10 rounded-xl overflow-hidden flex flex-col items-center justify-center group relative">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData({...formData, image: ''})}
                                            className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label className="cursor-pointer text-center p-4 w-full h-full flex flex-col items-center justify-center hover:bg-white/5 transition-colors">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setFormData({...formData, image: reader.result});
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <ImageIcon className="w-10 h-10 text-gray-700 mx-auto mb-2" />
                                    <p className="text-[10px] text-gray-500 font-mono">Click to Upload Image</p>
                                    <p className="text-[8px] text-gray-600 font-mono mt-1">(Supports JPG, PNG, WEBP)</p>
                                </label>
                            )}
                        </div>

                        <div className="pt-2">
                            <label className="text-[10px] text-gray-500 font-mono uppercase mb-2 block">Or Paste URL</label>
                            <input 
                                type="text"
                                placeholder="https://..."
                                value={formData.image.startsWith('data:') ? '' : formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white font-mono outline-none focus:border-primary/40"
                            />
                        </div>
                        <p className="text-[10px] text-gray-600 font-mono italic px-1">Tip: Use an image hoster or cloud storage URL.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
                <button 
                    type="button" 
                    onClick={() => navigate('/admin/certificates')}
                    className="px-6 py-2 text-gray-500 hover:text-white font-mono text-sm transition-colors"
                >
                    Discard Changes
                </button>
                <button 
                    type="submit" 
                    disabled={submitting}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 bg-primary text-black rounded-xl font-mono text-sm font-bold transition-all hover:bg-primary/90",
                        submitting && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {initialData ? 'Update Certificate' : 'Save Certificate'}
                </button>
            </div>
        </form>
    );
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false, icon: Icon }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 flex items-center gap-2">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
            </label>
            <input 
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-mono outline-none focus:border-primary/40 transition-colors"
            />
        </div>
    );
}
