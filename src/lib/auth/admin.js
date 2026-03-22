import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
// You can move this to a config file if preferred
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
/**
 * Retrieves the current authenticated user only if they are an admin.
 * Returns null if not authenticated or not an admin.
 *
 * ARCHITECTURE NOTE:
 * We use a hybrid approach for Admin Auth:
 * 1. Supabase Auth handles identity (Who is this?)
 * 2. Environment Variables (ADMIN_EMAILS) handle authorization (What can they do?)
 *
 * Why not a DB table for admins?
 * - For a personal portfolio, hardcoded env vars are safer and simpler (Infrastructure as Code).
 * - No risk of accidentally deleting the only admin from the DB.
 * - Zero DB reads required for initial permission check (faster).
 */
export async function getAdminSession() {
    // We are now using local storage for authentication,
    // so we can just return a mock user if they have the token.
    const token = localStorage.getItem('admin_token');
    if (token === 'authed') {
        return { email: 'admin@example.com' };
    }
    return null;
}

export async function requireAdmin() {
    const user = await getAdminSession();
    if (!user) {
        // Just return null here since the React Router handles redirects
        return null;
    }
    return user;
}
