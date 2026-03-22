import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ffdmsnowggjbjymxgaiy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3x7CZ2i-ryTVjSzb0n69Gw_wZjLRVpr';

export function createClient() {
    return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
