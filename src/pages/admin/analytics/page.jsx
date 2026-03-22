import { VisitorsChart, DeviceDonut } from '@/components/admin/analytics/AnalyticsCharts';
import { Monitor, Users, MousePointer, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAnalyticsSummary } from '@/lib/mock-actions';

// Mock empty analytics display
export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
    const [stats, setStats] = useState({ views: 0, visitors: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnalyticsSummary().then(data => {
            setStats(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const totalVisitors = stats.visitors || 0;
    const totalPageViews = stats.views || 0;
    
    // Mock empty charts for local Vite client
    const visitorsChartData = [];
    const deviceData = [];
    const topPages = [];

    if (loading) return <div className="p-8 text-white">Loading system metrics...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                    <Activity className="text-primary w-6 h-6"/>
                    System Analytics
                </h1>
                <p className="text-gray-400 font-mono text-xs mt-1">$ analytics.run --verbose</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Card 1 */}
                <div className="bg-black/40 border border-[#333] p-6 rounded-xl hover:border-primary/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 font-mono text-xs group-hover:text-primary">TOTAL_VISITORS</span>
                        <Users className="w-4 h-4 text-gray-600 group-hover:text-primary"/>
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                        {totalVisitors.toLocaleString()}
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-black/40 border border-[#333] p-6 rounded-xl hover:border-primary/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 font-mono text-xs group-hover:text-primary">PAGE_VIEWS</span>
                        <MousePointer className="w-4 h-4 text-gray-600 group-hover:text-primary"/>
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                        {totalPageViews.toLocaleString()}
                    </div>
                </div>

                {/* Card 3 (Avg Pages/Visitor - rough calc) */}
                <div className="bg-black/40 border border-[#333] p-6 rounded-xl hover:border-primary/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 font-mono text-xs group-hover:text-primary">AVG_PAGES/SESSION</span>
                        <Monitor className="w-4 h-4 text-gray-600 group-hover:text-primary"/>
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                        {totalVisitors ? (totalPageViews / totalVisitors).toFixed(1) : 0}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-black/40 border border-[#333] p-6 rounded-xl">
                    <h3 className="text-sm font-mono text-gray-400 mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary"/>
                        Traffic Overview (Last 30 Days)
                    </h3>
                    <VisitorsChart data={visitorsChartData}/>
                </div>

                {/* Side Stats */}
                <div className="space-y-6">
                    {/* Device Donut */}
                    <div className="bg-black/40 border border-[#333] p-6 rounded-xl">
                        <h3 className="text-sm font-mono text-gray-400 mb-4">Device Breakdown</h3>
                        <DeviceDonut data={deviceData}/>
                    </div>

                    {/* Top Pages */}
                    <div className="bg-black/40 border border-[#333] p-6 rounded-xl">
                        <h3 className="text-sm font-mono text-gray-400 mb-4">Top Pages</h3>
                        <div className="space-y-3">
                            {topPages.map(([path, count], i) => (
                                <div key={path} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-gray-600 w-4">{i + 1}</span>
                                        <span className="text-gray-300 font-mono truncate max-w-[150px]">{path}</span>
                                    </div>
                                    <span className="text-primary font-bold font-mono">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
