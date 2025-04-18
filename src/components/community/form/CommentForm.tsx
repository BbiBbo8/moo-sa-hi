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
import { useUserData } from "@/hooks/useUserData";
import { useInsertComment } from "@/hooks/comment/useCommentMutation";
import Error from "@/app/(pages)/Error";
import Loading from "@/app/(pages)/Loading";
import getUserData from "@/supabase/getUserData";
import { useState } from "react";
import SigninDrawer from "@/components/auth/SigninDrawer";

const commentSchema = z.object({
  content: z
    .string()
    .min(5, "댓글은 최소 5자 이상 입력해 주세요.")
    .max(30, "댓글은 최대 30자까지만 입력할 수 있습니다."),
});

type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ postId }: { postId: number }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data, error, isLoading } = useUserData();
  const userId = data?.user?.id;
  const userData = getUserData();

  if (isLoading) {
    <Loading />;
  }
  if (error) {
    <Error />;
  }

  const handleCommentInputClick = async () => {
    const { user } = await userData;
    if (!user) {
      setIsDrawerOpen(true);
    }
  };

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
    <>
      <Form {...form}>
        <form
          onClick={handleCommentInputClick}
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-4"
        >
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

      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default CommentForm;
