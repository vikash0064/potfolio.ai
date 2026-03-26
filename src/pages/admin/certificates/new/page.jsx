"use client";
import React from 'react';
import CertificateForm from '@/components/admin/certificates/CertificateForm';
import { createCertificate } from '@/lib/mock-actions';

export default function NewCertificatePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Add New Certificate</h1>
                <p className="text-gray-400 font-mono text-xs mt-1">Populate your credentials section</p>
            </div>

            <CertificateForm action={createCertificate} />
        </div>
    );
}
