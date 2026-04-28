
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
