import { getTrashItems } from '@/lib/mock-actions';
import ActivityTabs from '@/components/admin/activity/ActivityTabs';
import { Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function ActivityPage() {
    const [trashItems, setTrashItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrashItems().then(data => {
            setTrashItems(data || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-white">Loading activity...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                    <Shield className="text-primary w-6 h-6"/>
                    System Activity
                </h1>
                <p className="text-gray-400 font-mono text-xs mt-1">$ tail -f /var/log/syslog</p>
            </div>

            <ActivityTabs logs={[]} trashItems={trashItems}/>
        </div>
    );
}
