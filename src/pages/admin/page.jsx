import { requireAdmin } from '@/lib/auth/admin';
import { getAnalyticsSummary } from '@/lib/mock-actions';
import AdminOverviewAnalytics from '@/components/admin/overview/AdminOverviewAnalytics';
import Link from '@/components/ui/NextLink';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
    const [user, setUser] = useState({ email: "admin@example.com" });
    const [analyticsData, setAnalyticsData] = useState({ views: 0, visitors: 0, likes: 0 });

    useEffect(() => {
        requireAdmin().then(u => u && setUser(u)).catch(console.error);
        getAnalyticsSummary().then(setAnalyticsData).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                    Overview
                    <span className="text-xs text-primary font-mono ml-4 animate-pulse">●</span>
                </h1>
                <p className="text-gray-400">
                    Welcome back, <span className="text-primary">{user.email}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder Cards - Keeping these as quick links */}
                {['Projects', 'Skills', 'Experience', 'Certificates'].map((item) => (
                    <Link key={item} href={`/admin/${item.toLowerCase()}`} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group cursor-pointer block">
                        <h3 className="text-lg font-bold text-gray-200 group-hover:text-primary mb-2 flex items-center gap-2">
                            {item}
                        </h3>
                        <p className="text-gray-500 text-sm">View and manage your portfolio {item.toLowerCase()}.</p>
                    </Link>
                ))}
            </div>

            {/* Analytics Module */}
            <AdminOverviewAnalytics data={analyticsData} />
        </div>
    );
}
