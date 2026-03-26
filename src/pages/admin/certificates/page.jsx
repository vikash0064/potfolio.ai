"use client";
import React, { useState, useEffect } from 'react';
import Link from '@/components/ui/NextLink';
import { Plus, Edit2, Award, ExternalLink, Calendar, Image as ImageIcon } from 'lucide-react';
import { getCertificates } from '@/lib/api';
import { deleteCertificate } from '@/lib/mock-actions';
import { DeleteConfirmation } from '@/components/admin/delete-confirmation';
import { EmptyState } from '@/components/ui/empty-state';

export default function AdminCertificatesPage() {
    const [certificates, setCertificates] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCertificates().then(data => {
            setCertificates(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-white font-mono">Loading certificates...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">Certificates Manager</h1>
                    <p className="text-gray-400 font-mono text-xs mt-1">Manage your credentials & achievement proofs</p>
                </div>
                <Link href="/admin/certificates/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-mono text-sm font-bold">
                    <Plus className="w-4 h-4"/>
                    Add Certificate
                </Link>
            </div>

            {!certificates || certificates.length === 0 ? (
                <EmptyState 
                    title="No certificates found" 
                    description="Upload your certificates to display them in the LS section." 
                    icon={Award}
                    action={{ label: "Add Certificate", href: "/admin/certificates/new" }}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="bg-black/40 border border-[#333] rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                            {cert.image ? (
                                <div className="aspect-video w-full relative group-hover:opacity-80 transition-opacity">
                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                            ) : (
                                <div className="aspect-video w-full bg-[#111] flex items-center justify-center border-b border-[#333]">
                                    <ImageIcon className="w-8 h-8 text-gray-700" />
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <h3 className="font-bold text-white font-mono text-sm leading-tight line-clamp-2">{cert.title}</h3>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/certificates/${cert.id}/edit`} className="p-1.5 text-gray-400 hover:text-white rounded-lg">
                                            <Edit2 className="w-3.5 h-3.5"/>
                                        </Link>
                                        <div className="p-1.5">
                                            <DeleteConfirmation itemTitle={cert.title} onDelete={() => deleteCertificate(cert.id).then(() => setCertificates(prev => prev.filter(c => c.id !== cert.id)))}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-mono uppercase tracking-wider">
                                        <Award className="w-3 h-3 text-primary" />
                                        <span>{cert.issuer}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono italic">
                                        <Calendar className="w-3 h-3" />
                                        <span>{cert.date}</span>
                                    </div>
                                    {cert.link && (
                                        <div className="flex items-center gap-2 text-primary/60 text-[10px] font-mono truncate">
                                            <ExternalLink className="w-3 h-3" />
                                            <span>{cert.link}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
