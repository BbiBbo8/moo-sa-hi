"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import createClient from "@/supabase/client";
import PATH from "@/constants/PATH";
import { toast } from "sonner";

const formSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
});

type FormData = z.infer<typeof formSchema>;

const NicknameForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    const supabase = createClient();

    const { error: dbError } = await supabase.from("users").upsert({
      id: userId,
      nickname: data.nickname,
    });

    if (dbError) {
      toast.error("닉네임 저장 실패");
    } else {
      toast.success("닉네임 저장 완료");
      router.push(PATH.HOME);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input
                  placeholder="닉네임 입력"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "저장하기"}
        </Button>
      </form>
    </Form>
  );
};

export default NicknameForm;