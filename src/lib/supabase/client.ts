import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

// Browser (client component) Supabase client. Returns null in demo mode so
// callers can fall back gracefully. Cookie-based, so it shares its session with
// the server client and middleware.
export function createClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string);
}
