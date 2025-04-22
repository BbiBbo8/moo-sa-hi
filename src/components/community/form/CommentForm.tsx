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
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

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

  const insertCommentMutation = useInsertComment();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const handleCommentInputClick = async () => {
    const { user } = await userData;
    if (!user) {
      setIsDrawerOpen(true);
    }
  };

  const onSubmit = (formData: CommentFormData) => {
    if (!userId) {
      return;
    }

    insertCommentMutation.mutate({
      content: formData.content,
      userId,
      postId,
    });
    form.reset();
  };

  const { watch } = form;
  const commentContent = watch("content");

  // 값이 있을 때 아이콘 변경
  const currentIconSrc =
    commentContent && commentContent.length > 0
      ? "/icons/Property-Activate.svg"
      : "/icons/Property-Disabled.svg";

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="m-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center rounded-[8px] bg-[#FAFAFA] focus-within:border focus-within:border-[#999999] focus-within:outline-none active:outline-none">
                    <Textarea
                      placeholder="댓글을 입력해주세요."
                      {...field}
                      className="h-fit resize-none rounded-[8px] border-transparent bg-[#FAFAFA] pr-10 text-base font-normal text-[#1A1A1A] placeholder:text-base placeholder:text-[#999999] focus:ring-transparent focus:outline-none"
                      onClick={handleCommentInputClick}
                    />
                    <Button
                      type="submit"
                      className="box-border:none absolute right-2 bottom-2 w-fit border-none bg-transparent shadow-none"
                      disabled={
                        !commentContent ||
                        commentContent.length < 5 ||
                        commentContent.length > 30
                      }
                    >
                      <Image
                        src={currentIconSrc}
                        alt="등록"
                        width={24}
                        height={24}
                      />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-[#1A1A1A]" />
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
