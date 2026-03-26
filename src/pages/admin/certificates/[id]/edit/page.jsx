"use client";
import React, { useState, useEffect } from 'react';
import CertificateForm from '@/components/admin/certificates/CertificateForm';
import { updateCertificate } from '@/lib/mock-actions';
import { getCertificateById } from '@/lib/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditCertificatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState(null);

    useEffect(() => {
        getCertificateById(id).then(data => {
            if (!data) navigate('/admin/certificates');
            else setCertificate(data);
        });
    }, [id, navigate]);

    if (!certificate) return <div className="p-8 text-white font-mono">Loading certificate...</div>;

    const actionWithId = async (formData) => {
        return await updateCertificate(id, formData);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Edit Certificate</h1>
                <p className="text-gray-400 font-mono text-xs mt-1">Update your achievement details & proofs</p>
            </div>

            <CertificateForm initialData={certificate} action={actionWithId} />
        </div>
    );
}
