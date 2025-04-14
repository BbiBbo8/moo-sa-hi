"use client";

import { useQuery } from "@tanstack/react-query";
import createClient from "@/supabase/client";

const fetchDailyPostDetail = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("daily_post")
    .select(
      `
      id,
      created_at,
      title,
      contents,
      img_url,
      user:user_id (
        nickname,
        profile_image
      ),
      helpfuls (
        id,
        daily_post_id,
        shelter_post_id
      )
    `,
    )
    .eq("id", id)
    .single(); // 단일 게시글이라면 .single() 추천

  if (error) throw new Error(error.message);
  return data;
};

export const useDailyPostDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["dailyPostDetails", id],
    queryFn: () => fetchDailyPostDetail(id),
    enabled: !!id,
  });
};
