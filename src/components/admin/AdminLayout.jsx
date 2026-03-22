import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import MagneticCursor from '@/components/common/MagneticCursor';

export default function AdminLayout() {
    // For now we assume the user is valid if they reach here, as auth is mocked/bypassed
    const user = { email: "admin@example.com", id: "1" };

    return (
        <div className="flex min-h-screen bg-background text-foreground font-mono">
            <MagneticCursor />
            {/* Sidebar - Desktop Only for now */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 md:ml-64">
                <AdminHeader user={user} />

                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6 overflow-y-auto overflow-x-hidden relative">
                    {/* Subtle background grid effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '32px 32px'
                        }}
                    />
                    <div className="relative z-0">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
