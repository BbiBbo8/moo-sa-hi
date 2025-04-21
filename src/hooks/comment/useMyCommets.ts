import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../useUserData";

interface Comment {
  shelter_post_id: number | null;
  daily_post_id: number | null;
}

interface shelterPost {
  title: string | null;
  id: number;
  shelter_name: string | null;
}

interface dailyPost {
  title: string | null;
  id: number;
}

export const useMyComments = () => {
  const supabase = createClient();
  const { data } = useUserData();
  const userId = data?.user?.id;

  const getMyComments = async () => {
    try {
      const { data: comments } = await supabase
        .from("comments")
        .select("shelter_post_id, daily_post_id")
        .eq("user_id", userId!);

      const { data: shelterPosts, error: shelterError } = await supabase
        .from("shelter_post")
        .select("title, id, shelter_name");

      const { data: dailyPosts, error: dailyError } = await supabase
        .from("daily_post")
        .select("title, id");

      if (shelterError || dailyError) {
        console.error("불러오기 오류 발생", shelterError, dailyError);
      }

      const MatchMyPosts = (
        comments: Comment[],
        shelterPosts: shelterPost[],
        dailyPosts: dailyPost[],
      ) => {
        const matchedShelterPost: shelterPost[] = [];
        const matchedDailtyPost: dailyPost[] = [];
        for (const comment of comments) {
          if (comment.shelter_post_id !== null) {
            const matchedPost = shelterPosts.find(
              post => post.id === comment.shelter_post_id,
            );
            if (matchedPost) {
              matchedShelterPost.push(matchedPost);
            }
          }
          if (comment.daily_post_id !== null) {
            const matchedPost = dailyPosts.find(
              post => post.id === comment.daily_post_id,
            );
            if (matchedPost) {
              matchedDailtyPost.push(matchedPost);
            }
          }
        }
        return { matchedShelterPost, matchedDailtyPost };
      };

      const posts = MatchMyPosts(comments!, shelterPosts!, dailyPosts!);
      return posts;
    } catch (error) {
      console.error("댓글 단 게시글 불러오기 실패", error);
      return null;
    }
  };
  return useQuery({
    queryKey: ["myComments", userId],
    queryFn: getMyComments,
    enabled: !!userId,
  });
};
