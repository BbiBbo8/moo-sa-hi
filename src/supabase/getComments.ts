import createClient from "./client";

const getComments = async (postId: string) => {
  const supabase = createClient();
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      /* 대피소 글과 일상 글 전부 가져오기 */
      .or(`shelter_post_id.eq.${postId}, daily_post_id.eq.${postId}`);
    return comments;
  } catch (error) {
    throw new Error("댓글 불러오기 실패");
  }
};

export default getComments;
