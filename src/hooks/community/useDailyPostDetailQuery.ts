"use client";

import { useQuery } from "@tanstack/react-query";
import createClient from "@/supabase/client";

const fetchDailyPostDetail = async (id: number) => {
  const supabase = createClient();

  const { data: postData, error: postError } = await supabase
    .from("daily_post")
    .select(
      `
      id,
      created_at,
      title,
      contents,
      img_url,
      user:user_id (
        nickname
      )
    `,
    )
    .eq("id", id)
    .single();

  if (postError) throw new Error(postError.message);

  const { count, error: countError } = await supabase
    .from("helpfuls")
    .select("*", { count: "exact", head: true })
    .eq("daily_post_id", id);

  if (countError) throw new Error(countError.message);

  return {
    ...postData,
    helpfulCount: count ?? 0,
  };
};

export const useDailyPostDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["dailyPostDetails", id],
    queryFn: () => fetchDailyPostDetail(id),
    enabled: !!id,
  });
};
