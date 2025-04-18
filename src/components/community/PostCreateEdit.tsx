"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import PATH from "@/constants/PATH";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ShelterForm from "./form/ShelterForm";
import DailyForm from "./form/DailyForm";
import ImageDropzone from "./form/ImageDropzone";
import { Constants } from "database.types";

import BackButton from "@/components/ui/BackButton";
import PostTypeDropdown from "@/components/ui/PostTypeDropdown";
import createClient from "@/supabase/client";

const supabase = createClient();

export const CONGESTION_LEVELS = Constants.public.Enums.people_tags;
export const HYGIENE_LEVELS = Constants.public.Enums.cleanliness_tags;

// daily는 congestion, hygiene 입력 안해서 옵션 넣었음
const EditSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "내용을 입력해주세요"),
  congestion: z.enum(Constants.public.Enums.people_tags).optional(),
  hygiene: z.enum(Constants.public.Enums.cleanliness_tags).optional(),
  shelter_id: z.string().optional(),
  imgUrl: z.string().optional(),
});

export type FormData = z.infer<typeof EditSchema>;

function PostCreateEdit() {
  const router = useRouter();
  const [category, setCategory] = useState<"shelter" | "daily">("shelter");
  const [imgUrl, setImgUrl] = useState<string | null>(null);

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

  // shelter/daily에 따라 payload를 분기 처리
  const handlePostInsert = async (values: FormData) => {
    const basePayload = {
      user_id: user!.id,
      title: values.title,
      contents: values.contents,
      img_url: imgUrl ?? "",
    };

    const shelterPayload = {
      ...basePayload,
      people: values.congestion,
      cleanliness: values.hygiene,
      shelter_name: selectedShelter?.name ?? "",
    };

    return category === "shelter"
      ? await supabase.from("shelter_post").insert(shelterPayload)
      : await supabase.from("daily_post").insert(basePayload);
  };

  const onSubmit = async (values: FormData) => {
    if (!user?.id) {
      toast.error("로그인 상태를 확인해주세요.");
      return;
    }

    const insertResult = await handlePostInsert(values);

    if (insertResult.error) {
      console.error("INSERT 실패:", insertResult.error); // 로그 출력
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[20px] px-[16px] pb-[32px] font-['IBM_Plex_Sans_KR']"
      >
        {/* 상단 바: 뒤로가기 + 드롭다운 + 등록 */}
        <div className="flex items-center justify-between">
          <BackButton />
          <div className="flex-1 text-center font-['IBM_Plex_Sans_KR'] text-[18px]">
            <PostTypeDropdown
              current={category === "shelter" ? "대피소 글쓰기" : "일상 글쓰기"}
              onChange={value =>
                setCategory(value === "대피소 글쓰기" ? "shelter" : "daily")
              }
            />
          </div>
          <Button
            type="submit"
            className="rounded-full bg-[#3A7E8D] px-4 py-1 text-sm text-white hover:bg-[#60A1B0] active:bg-[#2B5D6C]"
          >
            등록
          </Button>
        </div>

        {/* 조건부 렌더링: ShelterForm / DailyForm */}
        {category === "shelter" ? (
          <ShelterForm
            onShelterSelect={shelter => {
              form.setValue("shelter_id", shelter.id);
              setSelectedShelter({ id: shelter.id, name: shelter.name });
            }}
          />
        ) : (
          <DailyForm />
        )}

        {/* 이미지 업로드 드롭존 */}
        <ImageDropzone
          value={imgUrl ? [imgUrl] : []}
          onChange={urls => setImgUrl(urls[0])}
          maxFiles={5}
        />
      </form>
    </Form>
  );
}

export default PostCreateEdit;
