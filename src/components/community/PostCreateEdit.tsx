"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import createClient from "@/supabase/client";
import { Button } from "@/components/ui/button";
import ImageDropzone from "@/components/community/form/ImageDropzone";
import ShelterForm from "@/components/community/form/ShelterForm";

const supabase = createClient();

// enum 정의
export const CONGESTION_LEVELS = ["여유", "보통", "혼잡"] as const;
export const HYGIENE_LEVELS = ["청결", "보통", "불량"] as const;

const EditSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "내용을 입력해주세요"),
  congestion: z.enum(["여유", "보통", "혼잡"]),
  hygiene: z.enum(["청결", "보통", "불량"]),
  shelter_id: z.string().min(1, "대피소를 선택해주세요"),
});

export type FormData = z.infer<typeof EditSchema>;

function PostCreateEdit() {
  const router = useRouter();
  const { toast } = useToast();

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      title: "",
      contents: "",
      congestion: undefined,
      hygiene: undefined,
      shelter_id: "",
    },
  });

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lon: longitude });
      });
    }
  }, []);

  // 거리 계산 함수
  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const onSubmit = async (values: FormData) => {
    const { data: postData, error: insertError } = await supabase
      .from("shelter_post")
      .insert({
        title: values.title,
        contents: values.contents,
        people: values.congestion,
        cleanliness: values.hygiene,
        shelter_name: values.shelter_id,
      })
      .select()
      .single();

    if (insertError) {
      return toast({ title: "글 저장 중 오류가 발생했습니다." });
    }

    if (postData) {
      await Promise.all(
        uploadedImages.map(url =>
          supabase.from("images").insert({
            img_url: url,
            shelter_post_id: postData.id,
          }),
        ),
      );
    }

    toast({ title: "글이 등록되었습니다!" });
    router.push("/community/shelter");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ShelterForm />

        <ImageDropzone
          value={uploadedImages}
          onChange={setUploadedImages}
          maxFiles={5}
        />

        <Button type="submit" className="mt-6 w-full">
          글 등록
        </Button>
      </form>
    </FormProvider>
  );
}

export default PostCreateEdit;
