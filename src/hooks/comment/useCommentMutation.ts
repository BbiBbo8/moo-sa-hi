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
  const supabaseAdmin = createClient(); // 관리자 권한 클라이언트 (알림 삽입용)
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

    const { data: comment, error } = await supabase
      .from("comments")
      .insert([payload])
      .select("id") //댓글 ID 가져오기
      .single();

    if (error) throw error;
    return {
      comment,
      userId,
      postId,
      content,
      postType: pathname.includes(PATH.COMMUNITYSHELTER)
        ? "shelter_post"
        : "daily_post",
    }; // 필요한 정보를 반환
  };

  //   mutation으로 동기화
  return useMutation({
    mutationFn: handleInsertComments,
    onSuccess: async ({ comment, userId, postId, postType }) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("댓글 작성 완료!");

      // 댓글 작성 성공 후 알림 생성 로직
      if (comment?.id) {
        let postResult;
        let postIdForNotification: number | string | null = null;
        let postTypeForNotification: "shelter_post" | "daily_post" | null =
          null;

        if (postType === "shelter_post" && postId) {
          postResult = await supabaseAdmin
            .from("shelter_post")
            .select("user_id, title")
            .eq("id", postId)
            .single();
          postIdForNotification = postId;
          postTypeForNotification = "shelter_post";
        } else if (postType === "daily_post" && postId) {
          postResult = await supabaseAdmin
            .from("daily_post")
            .select("user_id, title")
            .eq("id", postId)
            .single();
          postIdForNotification = postId;
          postTypeForNotification = "daily_post";
        }

        if (postResult?.data?.user_id && postResult.data.user_id !== userId) {
          const { error: notificationError } = await supabaseAdmin
            .from("notifications")
            .insert({
              user_id: postResult.data.user_id,
              type: "new_comment",
              comment_id: comment.id,
              message: `'${postResult.data.title}'에 새로운 댓글이 달렸습니다.`,
              post_id: postIdForNotification, // 게시물 ID 저장
              post_type: postTypeForNotification, // 게시물 타입 저장
            });

          if (notificationError) {
            console.error("알림 생성 실패:", notificationError);
          }
        }
      }
    },
    onError: () => {
      toast.error("댓글 작성 오류 발생");
    },
  });
};

export const useDeleteComment = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  //   댓글을 삭제하는 함수
  const handleDeleteComments = async (id: number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) throw error;
  };

  // mutation으로 동기화
  return useMutation({
    mutationFn: handleDeleteComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: error => {
      console.error(error);
      toast.error("댓글 삭제 오류!");
    },
  });
};