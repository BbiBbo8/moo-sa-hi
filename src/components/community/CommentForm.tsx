"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import createClient from "@/supabase/client";
import PATH from "@/constants/PATH";
import { toast } from "sonner";

const commentSchema = z.object({
  content: z
    .string()
    .min(5, "댓글은 최소 5자 이상 입력해 주세요.")
    .max(30, "댓글은 최대 30자까지만 입력할 수 있습니다."),
});

type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = () => {
  const {
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });
  const pathname = usePathname();
  const supabase = createClient();

  const handleInsertComments = async ({ content }: { content: string }) => {
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

  const onSubmit = (content: CommentFormData) => {
    handleInsertComments(content);
    reset();
  };

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>댓글</FormLabel>
              <FormControl>
                <Input
                  placeholder="댓글을 입력해주세요."
                  {...field}
                  className="w-full border px-2 py-1"
                />
              </FormControl>
              <FormMessage />
              <Button
                type="submit"
                className="bg-blue-500 px-4 py-2 text-white"
              >
                등록
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CommentForm;
