import getUserData from "@/supabase/getUserData";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    staleTime: 1000 * 60 * 5,
  });
};
