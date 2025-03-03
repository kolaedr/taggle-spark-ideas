
import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fdumvflrlpmlfsmwampz.supabase.co';
// Make sure we have a fallback for the anon key
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdW12ZmxybHBtbGZzbXdhbXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODk3NTgsImV4cCI6MjA1NjU2NTc1OH0.aULv2HFiDs5-Kd4wYBzJ1QEfksBlzzYB2JpvYN5UCME';

// Create the Supabase client with proper URL format and anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
