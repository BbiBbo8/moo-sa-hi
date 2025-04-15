import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useUserData } from "./useUserData";

const useGetPosts = () => {
  const { data } = useUserData();
  const userId = data?.user?.id;
  const getPosts = async () => {
    try {
      const supabase = createClient();
      // 유저 id 참조해 모든 커뮤니티 글 불러오기
      const { data: shelter_post, error: shelterError } = await supabase
        .from("shelter_post")
        .select("*")
        .eq("user_id", userId);

      const { data: daily_post, error: dailyError } = await supabase
        .from("daily_post")
        .select("*")
        .eq("user_id", userId);

      if (shelterError || dailyError) {
        return console.error("불러오기 오류 발생");
      }
      return { shelter_post, daily_post };
    } catch (error) {
      throw new Error("게시글 불러오기 실패");
    }
  };
  return useQuery({
    queryKey: ["posts"],
    queryFn: userId => getPosts(userId),
  });
};

export default useGetPosts;
