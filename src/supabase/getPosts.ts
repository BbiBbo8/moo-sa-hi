import createClient from "./client";

const getPosts = async (id: string) => {
  try {
    const supabase = createClient();
    const { data: shelter_post, error } = await supabase
      .from("shelter_post")
      .select("*");
    return shelter_post;
  } catch (error) {
    throw new Error("게시글 불러오기 실패");
  }
};

export default getPosts;
