"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { useUserData } from "@/hooks/useUserData";

const supabase = createClient();

export const CONGESTION_LEVELS = Constants.public.Enums.people_tags;
export const HYGIENE_LEVELS = Constants.public.Enums.cleanliness_tags;

const EditSchema = z.object({
  title: z.string().min(2, "제목을 입력해주세요"),
  contents: z.string().min(5, "내용을 입력해주세요"),
  congestion: z.enum(Constants.public.Enums.people_tags).optional(),
  hygiene: z.enum(Constants.public.Enums.cleanliness_tags).optional(),
  shelter_id: z.string().optional(),
});

export type FormData = z.infer<typeof EditSchema>;

function PostCreateEdit() {
  const router = useRouter();
  const [category, setCategory] = useState<"shelter" | "daily">("shelter");
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: clientUser } = useUserData();

  const { isPending, isError } = useQuery({
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
    },
  });

  const isFormValid =
    category === "shelter"
      ? !!selectedShelter?.id &&
        form.watch("title")?.trim() &&
        form.watch("contents")?.trim() &&
        form.watch("congestion") &&
        form.watch("hygiene")
      : form.watch("title")?.trim() && form.watch("contents")?.trim();

  const mutation = useMutation({
    mutationFn: async (values: FormData) => {
      const userId = clientUser!.user!.id;

      const basePayload = {
        user_id: userId,
        title: values.title,
        contents: values.contents,
      };

      const shelterPayload = {
        ...basePayload,
        img_url: imgUrls[0] ?? null,
        people: values.congestion,
        cleanliness: values.hygiene,
        shelter_name: selectedShelter?.name ?? "",
      };

      const dailyPayload = {
        ...basePayload,
        img_url: imgUrls[0] ?? null,
      };

      const postInsertResult =
        category === "shelter"
          ? await supabase
              .from("shelter_post")
              .insert(shelterPayload)
              .select()
              .single()
          : await supabase
              .from("daily_post")
              .insert(dailyPayload)
              .select()
              .single();

      if (postInsertResult.error || !postInsertResult.data) {
        throw new Error(postInsertResult.error?.message || "게시글 저장 실패");
      }

      const imageInsertResult = await supabase.from("images").insert(
        imgUrls.map(url => ({
          img_url: url,
          daily_post_id: category === "daily" ? postInsertResult.data.id : null,
          shelter_post_id:
            category === "shelter" ? postInsertResult.data.id : null,
        })),
      );

      if (imageInsertResult.error) {
        throw new Error("이미지 저장 실패: " + imageInsertResult.error.message);
      }

      return postInsertResult.data.id;
    },

    onSuccess: () => {
      toast.success("게시글이 성공적으로 저장되었습니다.");
      const redirectPath =
        category === "shelter" ? PATH.COMMUNITYSHELTER : PATH.COMMUNITYDAILY;
      router.push(redirectPath);
    },

    onError: error => {
      console.error("에러:", error);
      toast.error("게시글 저장에 실패했습니다.");
    },
  });

  const onSubmit = async (values: FormData) => {
    if (!clientUser?.user?.id) {
      toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
      return;
    }

    mutation.mutate(values);
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full [max-width:640px] space-y-[20px] px-[16px] pb-[32px] font-['IBM_Plex_Sans_KR']"
      >
        {/* 반응형 최대 너비 + 가운데 정렬 처리 완료 */}
        <div className="flex w-full items-center justify-between px-[16px]">
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
            disabled={!isFormValid}
            className={`rounded-full px-4 py-1 text-sm ${
              isFormValid
                ? "bg-[#3A7E8D] text-white hover:bg-[#60A1B0] active:bg-[#2B5D6C]"
                : "cursor-not-allowed border border-[#60A1B0] bg-white text-[#3A7E8D]"
            }`}
          >
            등록
          </Button>
        </div>

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

        <div className="px-[16px]">
          <ImageDropzone value={imgUrls} onChange={setImgUrls} maxFiles={5} />
        </div>
      </form>
    </Form>
  );
}

export default PostCreateEdit;
