"use client";

import { useState, useCallback } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import createClient from "@/supabase/client";
import { toast } from "sonner";
import PATH from "@/constants/PATH";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShelterSearchInput from "./form/ShelterSearchInput";
import ShelterForm from "./form/ShelterForm";
import DailyForm from "./form/DailyForm";
import ImageDropzone from "./form/ImageDropzone";

const supabase = createClient();

export const CONGESTION_LEVELS = ["여유", "보통", "혼잡"] as const;
export const HYGIENE_LEVELS = ["청결", "보통", "불량"] as const;

const EditSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "내용을 입력해주세요"),
  congestion: z.enum(CONGESTION_LEVELS).optional(),
  hygiene: z.enum(HYGIENE_LEVELS).optional(),
  shelter_id: z.string().optional(),
  imgUrl: z.string().optional(),
});

export type FormData = z.infer<typeof EditSchema>;

export default function PostCreateEdit() {
  const router = useRouter();
  const [category, setCategory] = useState<"shelter" | "daily">("shelter");
  const [imgUrl, setImgUrl] = useState<string | null>(null);

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

  const form = useForm<FormData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      title: "",
      contents: "",
      imgUrl: "",
    },
  });

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

  const onSubmit = async (values: FormData) => {
    if (!user?.id) {
      toast.error("로그인 상태를 확인해주세요.");
      return;
    }

    const insertResult = await handlePostInsert(values);

    if (insertResult.error) {
      toast.error(
        insertResult.error.message ?? "알 수 없는 오류가 발생했습니다.",
      );
    } else {
      toast.success("게시글이 성공적으로 저장되었습니다.");
      const redirectPath =
        category === "shelter" ? PATH.COMMUNITYSHELTER : PATH.COMMUNITYDAILY;
      router.push(redirectPath);
    }
  };

  const handleRemoveImage = () => {
    setImgUrl(null);
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError || !user) {
    toast.error("로그인 정보를 불러올 수 없습니다.");
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
          <ImageDropzone
            value={imgUrl ? [imgUrl] : []}
            onChange={urls => setImgUrl(urls[0])}
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

        {category === "shelter" ? <ShelterForm /> : <DailyForm />}
      </form>
    </Form>
  );
}
