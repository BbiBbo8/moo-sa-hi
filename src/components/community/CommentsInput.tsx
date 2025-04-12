"use client";

import React from "react";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import createClient from "@/supabase/client";
import { toast } from "sonner";

const supabase = createClient();

const CommentsInput = () => {
  const FormSchema = z.object({
    contents: z.string().max(30, {
      message: "댓글의 글자수는 30자를 초과할 수 없습니다.",
    }),
  });

  const InputForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        contents: "",
      },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      try {
        await supabase
          .from("comments")
          .insert({
            user_id: "someValue",
            shelter_post_id: "null",
            daily_post_id: "null",
            comments: data,
          })
          .select();
        toast.info("댓글 작성 완료!");
      } catch (error) {
        toast.error("댓글 작성 오류 발생");
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormControl>
                <Input {...field} />
              </FormControl>
            )}
          />
          <button type="submit">등록</button>
        </form>
      </Form>
    );
  };
};

export default CommentsInput;
