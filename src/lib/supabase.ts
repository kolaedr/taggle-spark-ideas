
import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fdumvflrlpmlfsmwampz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client with proper URL format
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
