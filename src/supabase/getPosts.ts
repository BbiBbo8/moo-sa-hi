import createClient from "./client";

const getPosts = async (id: string) => {
  try {
    const supabase = createClient();
    // 유저 id 참조해 모든 커뮤니티 글 불러오기
    const { data: shelter_post, error: shelterError } = await supabase
      .from("shelter_post")
      .select("*")
      .eq("user_id", id);

    const { data: daily_post, error: dailyError } = await supabase
      .from("daily_post")
      .select("*")
      .eq("user_id", id);

    return { shelter_post, daily_post };
  } catch (error) {
    throw new Error("게시글 불러오기 실패");
  }
};

export default getPosts;
