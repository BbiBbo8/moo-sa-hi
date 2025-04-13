"use client";

import { useQuery } from "@tanstack/react-query";
import createClient from "@/supabase/client";

const fetchShelterPostDetail = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("shelter_post")
    .select(
      `
      id,
      created_at,
      adress,
      title,
      contents,
      img_url,
      people,
      supplies,
      cleanliness,
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
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const useShelterPostDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["shelterPostDetails", id],
    queryFn: () => fetchShelterPostDetail(id),
  });
};

export default useShelterPostDetailQuery;
