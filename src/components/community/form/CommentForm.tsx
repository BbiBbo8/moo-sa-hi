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
import { useUserData } from "@/hooks/useUserData";
import { useInsertComment } from "@/hooks/comment/useCommentMutation";
import Error from "@/app/(pages)/Error";
import Loading from "@/app/(pages)/Loading";
import getUserData from "@/supabase/getUserData";
import { useState } from "react";
import SigninDrawer from "@/components/auth/SigninDrawer";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import uploadActivated from "public/icons/Property-Activate.svg";
import uploadDisabled from "public/icons/Property-Disabled.svg";

const commentSchema = z.object({
  content: z
    .string()
    .min(2, "댓글은 최소 2자 이상 입력해 주세요.")
    .max(30, "댓글은 최대 30자까지만 입력할 수 있습니다."),
});

type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ postId }: { postId: number }) => {
  const insertCommentMutation = useInsertComment();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data, error, isLoading } = useUserData();
  const userId = data?.user?.id;
  const userData = getUserData();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

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

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  // 값이 있을 때 아이콘 변경
  const currentIconSrc =
    commentContent && commentContent.length > 0
      ? uploadActivated
      : uploadDisabled;

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
                  <div className="bg-gray-10 relative flex items-center rounded-sm focus-within:border focus-within:border-gray-400 focus-within:outline-none active:outline-none">
                    <Textarea
                      placeholder="댓글을 입력해주세요."
                      {...field}
                      maxLength={30}
                      className="bg-gray-10 text-gray-10 h-fit resize-none rounded-sm border-transparent pr-10 text-base font-normal placeholder:text-base placeholder:text-gray-400 focus:ring-transparent focus:outline-none"
                      onClick={handleCommentInputClick}
                    />
                    <Button
                      type="submit"
                      className="box-border:none absolute right-2 bottom-2 w-fit border-none bg-transparent shadow-none hover:bg-transparent"
                      disabled={
                        !commentContent ||
                        commentContent.length < 2 ||
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
                <FormMessage className="text-gray-900" />
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
