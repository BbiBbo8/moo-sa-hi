import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import createClient from "@/supabase/client";
import PATH from "@/constants/PATH";
import { usePathname } from "next/navigation";

interface InsertComment {
  content: string;
  userId: string;
  postId: number;
}

export const useInsertComment = () => {
  const pathname = usePathname();
  const supabase = createClient();
  const queryClient = useQueryClient();

  //   댓글을 입력하는 함수
  const handleInsertComments = async ({
    content,
    userId,
    postId,
  }: InsertComment) => {
    if (!userId) throw new Error("유저 정보가 없습니다.");

    // path 값을 참조해서 post_id 다르게 적용
    const payload = pathname.includes(PATH.COMMUNITYSHELTER)
      ? {
          user_id: userId,
          shelter_post_id: postId,
          daily_post_id: null,
          comments: content,
        }
      : {
          user_id: userId,
          shelter_post_id: null,
          daily_post_id: postId,
          comments: content,
        };

    const { error } = await supabase.from("comments").insert([payload]);
    if (error) throw error;
  };
  //   mutation으로 동기화
  return useMutation({
    mutationFn: handleInsertComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("댓글 작성 완료!");
    },
    onError: () => {
      toast.error("댓글 작성 오류 발생");
    },
  });
};
