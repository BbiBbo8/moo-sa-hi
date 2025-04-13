import PATH from "@/constants/PATH";
import createClient from "@/supabase/client";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const supabase = createClient();
const CommentForm = () => {
  const pathname = usePathname();
  const handleInsertComments = async () => {
    try {
      if (pathname.includes(PATH.COMMUNITYSHELTER) === true) {
        await supabase
          .from("comments")
          .insert([
            {
              user_id: "11f37be0-4036-467b-b963-11b744903d1c",
              shelter_post_id: 4,
              daily_post_id: null,
              comments: data,
            },
          ])
          .select();
        toast.info("댓글 작성 완료!");
      } else {
        await supabase
          .from("comments")
          .insert({
            user_id: "11f37be0-4036-467b-b963-11b744903d1c",
            shelter_post_id: null,
            daily_post_id: 1,
            comments: data,
          })
          .select();
        toast.info("댓글 작성 완료!");
      }
    } catch (error) {
      toast.error("댓글 작성 오류 발생");
    }
  };
  return (
    <form>
      <input placeholder="댓글을 입력해주세요" />
      <button type="submit">댓글 달기</button>
    </form>
  );
};

export default CommentForm;
