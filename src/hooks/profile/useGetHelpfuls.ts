import createClient from "@/supabase/client";
import { useUserData } from "../useUserData";
import { useQuery } from "@tanstack/react-query";

export const useGetHelpfuls = () => {
  const supabase = createClient();
  const { data } = useUserData();
  const userId = data?.user?.id;
  const getMyHelpfuls = async () => {
    try {
      const { data: helpfulData, error } = await supabase
        .from("helpfuls")
        .select(
          `
      id,
      user_id,
      daily_post_id,
      shelter_post_id,
      daily_post (
        id,
        user_id,
        title,
        img_url
      ),
      shelter_post (
        id,
        user_id,
        title,
        img_url
      )
    `,
        )
        .eq("user_id", userId!);

      if (error) {
        console.error("불러오기 오류 발생", error);
      }

      return helpfulData;
    } catch (error) {
      return console.error("불러오기 오류 발생", error);
    }
  };
  return useQuery({
    queryKey: ["myHelpfuls", userId],
    queryFn: getMyHelpfuls,
    enabled: !!userId,
  });
};
