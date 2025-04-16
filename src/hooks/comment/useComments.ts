import getComments from "@/supabase/getComments";
import { useQuery } from "@tanstack/react-query";

export const useComments = ({ postId }: { postId: number }) => {
  const Id = String(postId);
  return useQuery({
    queryKey: ["comments"],
    queryFn: postId => getComments(Id),
  });
};
