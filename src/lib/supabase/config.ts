export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True only when real project credentials are present. When false the app runs
// in "demo mode": auth is disabled and the dashboard stays publicly viewable.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
