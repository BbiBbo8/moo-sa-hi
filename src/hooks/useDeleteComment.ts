import createClient from "@/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const supabase = createClient();

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  //   댓글을 삭제하는 함수
  const handleDeleteComments = async (id: number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) throw error;
  };

  return useMutation({
    mutationFn: handleDeleteComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: error => {
      toast.error("댓글 삭제 오류!");
    },
  });
};

export default useDeleteComment;
