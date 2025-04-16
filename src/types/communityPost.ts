import { fetchDailyPosts, fetchShelterPosts } from "@/supabase/getCommuniy";

export type DailyPostType = Awaited<ReturnType<typeof fetchDailyPosts>>[number];
export type ShelterPostType = Awaited<
  ReturnType<typeof fetchShelterPosts>
>[number];
