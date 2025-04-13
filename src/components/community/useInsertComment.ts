import PATH from "@/constants/PATH";
import createClient from "@/supabase/client";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const supabase = createClient();
const useInsertComments = ({ content }: { content: string }) => {
  const pathname = usePathname();
  const handleInsertComments = async () => {
    try {
      // 현재 pathname을 참조하여 대피소 커뮤니티일 때 대피소 댓글 insert
      if (pathname.includes(PATH.COMMUNITYSHELTER) === true) {
        await supabase
          .from("comments")
          .insert([
            {
              user_id: "11f37be0-4036-467b-b963-11b744903d1c" /* 확인용 임시 */,
              shelter_post_id: 4 /* 확인용 임시 */,
              daily_post_id: null,
              comments: content,
            },
          ])
          .select();
        toast.info("댓글 작성 완료!");
      } else {
        // 이외일 때 일상 댓글 insert
        await supabase
          .from("comments")
          .insert({
            user_id: "11f37be0-4036-467b-b963-11b744903d1c" /* 확인용 임시 */,
            shelter_post_id: null,
            daily_post_id: 1 /* 확인용 임시 */,
            comments: content,
          })
          .select();
        toast.info("댓글 작성 완료!");
      }
    } catch (error) {
      toast.error("댓글 작성 오류 발생");
    }
  };
  return { handleInsertComments };
};

export default useInsertComments;
