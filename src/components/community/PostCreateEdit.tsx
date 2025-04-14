"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import createClient from "@/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ShelterForm from "./form/ShelterForm";
import DailyForm from "./form/DailyForm";
import ImageDropzone from "./form/ImageDropzone";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

// Zod 스키마를 기반으로 타입 정의
const EditSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "내용을 입력해주세요"),
  imgUrl: z.string().optional(),
});

export type FormData = z.infer<typeof EditSchema>;

const PostCreateEdit = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [category, setCategory] = useState<"shelter" | "daily">("shelter");
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // DB 로그인 유저 정보 가져오기
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user)
        throw new Error("유저 정보를 불러오지 못했습니다.");
      return data.user;
    },
  });

  // 리액트 훅 폼
  const form = useForm<FormData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      title: "",
      contents: "",
      imgUrl: "",
    },
  });

  // 게시글 삽입
  const handlePostInsert = async (values: FormData) => {
    const payload = {
      title: values.title,
      contents: values.contents,
      img_url: imgUrl ?? "",
    };

    return category === "shelter"
      ? await supabase.from("shelter_post").insert(payload)
      : await supabase.from("daily_post").insert(payload);
  };

  // 등록 핸들러
  const onSubmit = async (values: FormData) => {
    if (!user?.id) return;

    const insertResult = await handlePostInsert(values);

    if (insertResult.error) {
      const errorMessage =
        insertResult.error?.message ?? "알 수 없는 오류가 발생했습니다.";
      toast({
        title: "저장 실패",
        description: errorMessage,
        variant: "destructive",
      });
    } else {
      toast({
        title: "저장 완료",
        description: "게시글이 성공적으로 저장되었습니다.",
      });
      router.push("/community");
    }
  };

  const handleRemoveImage = () => {
    setImgUrl(null);
  };

  // 로딩 & 에러 처리
  if (isPending) return <div>로딩 중...</div>;

  if (isError || !user) {
    toast({
      title: "유저 정보 오류",
      description: "로그인 정보를 불러올 수 없습니다.",
      variant: "destructive",
    });
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs
            value={category}
            onValueChange={(value: string) =>
              setCategory(value as "shelter" | "daily")
            }
          >
            <TabsList>
              <TabsTrigger value="shelter">대피소</TabsTrigger>
              <TabsTrigger value="daily">일상</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button type="submit">등록</Button>
        </div>

        <div className="space-y-4">
          {/* Dropzone : 업로드한 이미지 url로 전달 */}
          <ImageDropzone
            userId={user.id} // img 저장에는 여전히 userId필요
            category={category}
            onUploadComplete={(url: string | null) => setImgUrl(url)}
          />

          {imgUrl && (
            <div className="relative h-auto w-64">
              <Image
                src={imgUrl}
                alt="미리보기"
                width={256}
                height={192}
                className="rounded-md border border-gray-200 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={handleRemoveImage}
              >
                이미지 삭제
              </Button>
            </div>
          )}
        </div>

        {/* 선택된 카테고리에 따라 폼 렌더링 */}
        {category === "shelter" ? (
          <ShelterForm form={form} />
        ) : (
          <DailyForm form={form} />
        )}
      </form>
    </Form>
  );
};

export default PostCreateEdit;
