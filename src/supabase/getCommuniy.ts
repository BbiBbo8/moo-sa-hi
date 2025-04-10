import createClient from "./client";

export const fetchDailyPosts = async () => {
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

export const fetchShelterPosts = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("shelter_post")
    .select(
      `
      id,
      created_at,
      title,
      contents,
      img_url,
      people,
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
