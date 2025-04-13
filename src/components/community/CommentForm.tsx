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
import useInsertComments from "../../hooks/useInsertComment";

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

  const onSubmit = (content: CommentFormData) => {
    useInsertComments(content);
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
