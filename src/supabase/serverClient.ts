import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createClient(cookieStore: Parameters<typeof createServerComponentClient>[0]['cookies']): SupabaseClient<Database> {
  return createServerComponentClient<Database>({ cookies: cookieStore });
}