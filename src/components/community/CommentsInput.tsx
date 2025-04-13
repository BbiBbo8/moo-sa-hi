"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

// 1. zod 스키마 정의
const commentSchema = z.object({
  content: z
    .string()
    .min(5, "댓글은 최소 5자 이상 입력해 주세요.")
    .max(30, "댓글은 최대 30자까지만 입력할 수 있습니다."),
});

// 2. TypeScript 타입 자동 추론
type CommentFormData = z.infer<typeof commentSchema>;

// 3. 컴포넌트
const CommentForm = () => {
  const [comments, setComments] = useState<CommentFormData[]>([]);

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (values: CommentFormData) => {
    setComments(prev => [...prev, values]);
    reset();
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>댓글</FormLabel>
                <FormControl>
                  <Input
                    placeholder="댓글"
                    {...field}
                    className="w-full border px-2 py-1"
                  />
                </FormControl>
                <FormMessage />
                <Button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 text-white"
                >
                  댓글 작성
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-6 space-y-2">
        {comments.map((comment, index) => (
          <div key={index} className="rounded border p-2">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentForm;
