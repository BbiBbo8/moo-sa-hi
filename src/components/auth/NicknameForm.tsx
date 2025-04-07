"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
});

type FormData = z.infer<typeof nicknameSchema>;

export default function NicknameForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(nicknameSchema),
  });

  const router = useRouter();

  const onSubmit = async ({ nickname }: FormData) => {
    const { error } = await supabase.from("users").insert({
      id: userId,
      nickname,
    });

    if (error) {
      alert("닉네임 등록 실패");
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="닉네임 입력"
        {...register("nickname")}
        disabled={isSubmitting}
      />
      {errors.nickname && (
        <p className="text-sm text-red-500">{errors.nickname.message}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "등록 중..." : "닉네임 등록"}
      </Button>
    </form>
  );
}