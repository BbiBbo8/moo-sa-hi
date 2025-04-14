import { fetchDailyPosts } from "@/supabase/getCommuniy";

export type Post = Awaited<ReturnType<typeof fetchDailyPosts>>[number];
