import createClient from "./client";

const getComments = async (postId: string) => {
  const supabase = createClient();
  try {
    const { data: comments } = await supabase
      .from("comments")
      .select(
        `
  *,
  users!comments_user_id_fkey (*)
`,
      )
      /* 대피소 글과 일상 글 전부 가져오기 */
      .or(`shelter_post_id.eq.${postId}, daily_post_id.eq.${postId}`);
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("댓글 불러오기 실패");
  }
};

export default getComments;
