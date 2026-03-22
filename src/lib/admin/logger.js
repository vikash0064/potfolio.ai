import { createAdminClient } from '@/lib/supabase/admin';
export async function logAdminAction(action, entity, entityId, details, adminEmail = 'system' // Fallback if not provided, though it should be
) {
    const supabase = createAdminClient();
    try {
        const { error } = await supabase.from('audit_logs').insert({
            action,
            entity,
            entity_id: entityId,
            details,
            admin_email: adminEmail
        });
        if (error) {
            console.error('Failed to log admin action:', error);
        }
    }
    catch (e) {
        console.error('Exception logging admin action:', e);
    }
}
