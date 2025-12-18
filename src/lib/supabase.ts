import { createClient } from '@supabase/supabase-js';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!envUrl || !envKey) {
  console.error('Supabase environment variables are missing. Authentication will fail.');
}

const supabaseUrl = (envUrl && envUrl.length > 0) ? envUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = (envKey && envKey.length > 0) ? envKey : 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
