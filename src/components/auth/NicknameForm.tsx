"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileImageInput from "./ProfileImageInput";
import createClient from "@/supabase/client";

// zod 유효성 스키마 정의
const formSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
  profile_image: z
    .custom<FileList>()
    .refine(files => files?.length === 1, "이미지를 업로드 해주세요."),
});

type FormData = z.infer<typeof formSchema>;

export default function NicknameForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const supabase = createClient();

    // 파일 경로 지정 (유저 ID 기반으로 고유 경로 설정)
    const file = data.profile_image[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    // 이미지 업로드 (upsert: true → 같은 경로면 덮어쓰기)
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("이미지 업로드 실패:", uploadError);
      alert("이미지 업로드 실패");
      return;
    }

    // 퍼블릭 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // users 테이블에 닉네임과 이미지 URL 저장
    const { error: dbError } = await supabase.from("users").insert({
      id: userId,
      nickname: data.nickname,
      profile_image: publicUrl,
    });

    if (dbError) {
      alert("닉네임 저장 실패");
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

      <ProfileImageInput
        register={register}
        errors={errors}
        disabled={isSubmitting}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "등록 중..." : "닉네임 + 프로필 저장"}
      </Button>
    </form>
  );
}
