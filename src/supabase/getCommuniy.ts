import createClient from "./client";

export const fetchPosts = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("daily_post")
    .select(
      `
      id,
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
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
