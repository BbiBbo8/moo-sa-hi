import getComments from "@/supabase/getComments";
import { useQuery } from "@tanstack/react-query";

export const useComments = ({ postId }: { postId: number }) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getComments(String(id));
    },
  });
};