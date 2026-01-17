import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Browser Supabase client.
 *
 * Fixes rare cases where Vite env injection is missing at runtime by falling back
 * to the public URL + anon key (safe to embed in frontend).
 */
const ENV_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const ENV_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// Fallbacks (public values)
const FALLBACK_URL = "https://dthltjjyctcxmxzwwiho.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aGx0amp5Y3RjeG14end3aWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NjgxNTAsImV4cCI6MjA4MzQ0NDE1MH0.VYR0IFSFJdx_owxljR79tHW6OaTWVP0dnLLrSRzjWL8";

const SUPABASE_URL = ENV_URL?.trim() || FALLBACK_URL;
const SUPABASE_ANON_KEY = ENV_ANON_KEY?.trim() || FALLBACK_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
