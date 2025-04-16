"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import createClient from "@/supabase/client";
import { toast } from "sonner";
import PATH from "@/constants/PATH";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShelterForm from "./form/ShelterForm";
import DailyForm from "./form/DailyForm";
import ImageDropzone from "./form/ImageDropzone";
import { Constants } from "database.types";

const supabase = createClient();

export const CONGESTION_LEVELS = Constants.public.Enums.people_tags;
export const HYGIENE_LEVELS = Constants.public.Enums.cleanliness_tags;

const EditSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "내용을 입력해주세요"),
  congestion: z.enum(Constants.public.Enums.people_tags),
  hygiene: z.enum(Constants.public.Enums.cleanliness_tags),
  shelter_id: z.string().optional(),
  imgUrl: z.string().optional(),
});

export type FormData = z.infer<typeof EditSchema>;

function PostCreateEdit() {
  const router = useRouter();
  const [category, setCategory] = useState<"shelter" | "daily">("shelter");
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // 대피소 이름도 저장하기 위한 상태 추가
  const [selectedShelter, setSelectedShelter] = useState<{
    id: string;
    name: string;
  } | null>(null);

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
      user_id: user!.id, // 사용자 ID 저장
      title: values.title,
      contents: values.contents,
      img_url: imgUrl ?? "",
      people: values.congestion, // 혼잡도
      cleanliness: values.hygiene, // 위생 상태
      shelter_name: selectedShelter?.name ?? "", // 대피소 이름
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

        {/* 폼 본문 */}
        {category === "shelter" ? (
          <ShelterForm
            // 대피소 선택 시 이름까지 저장되도록 props 연결
            onShelterSelect={shelter => {
              form.setValue("shelter_id", shelter.id);
              setSelectedShelter({ id: shelter.id, name: shelter.name });
            }}
          />
        ) : (
          <DailyForm />
        )}

        {/* 이미지 업로드 */}
        <div className="space-y-4">
          <ImageDropzone
            value={imgUrl ? [imgUrl] : []}
            onChange={urls => setImgUrl(urls[0])}
          />
        </div>
      </form>
    </Form>
  );
}

export default PostCreateEdit;
