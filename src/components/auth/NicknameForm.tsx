"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const supabase = createClient();

const schema = z.object({
  nickname: z.string().min(2, "닉네임은 두 글자 이상!"),
});

type FormData = z.infer<typeof schema>;

const NicknameForm = ({ userId }: { userId: any }) => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const {error} = await supabase.from("users").insert({
      id: userId,
      nickname: data.nickname,
      profile_image: "",
    });

    if (error) {
        console.error("삽입 실패:", error.message)
      }
    location.href = "/"; // 홈으로 리다이렉트
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="닉네임 입력" {...register("nickname")} />
      <Button type="submit">등록</Button>
    </form>
  );
};

export default NicknameForm;