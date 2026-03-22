import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ffdmsnowggjbjymxgaiy.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'REMOVED_FOR_SECURITY';

export function createClient() {
    return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}
