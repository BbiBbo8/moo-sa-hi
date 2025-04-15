"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import createClient from "@/supabase/client";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import PATh from "@/constants/PATH";
import { useUserData } from "@/hooks/useUserData";
import { useInsertComment } from "@/hooks/useInsertComment";

const commentSchema = z.object({
  content: z
    .string()
    .min(5, "댓글은 최소 5자 이상 입력해 주세요.")
    .max(30, "댓글은 최대 30자까지만 입력할 수 있습니다."),
});

type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ postId }: { postId: number }) => {
  const {
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const supabase = createClient();
  const pathname = usePathname();

  const { data, error, isLoading } = useUserData();
  const userId = data?.user?.id;

  // supabase에 작성된 댓글을 넣는 함수 호출
  const insertCommentMutation = useInsertComment();

  const onSubmit = (formData: CommentFormData) => {
    if (!userId) {
      return;
    }

    insertCommentMutation.mutate({
      content: formData.content,
      userId,
      postId,
    });
    // 댓글 입력 후 리셋
    form.reset();
  };

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="댓글을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
              <Button type="submit">등록</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CommentForm;
