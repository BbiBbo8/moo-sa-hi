"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ShelterForm from "./form/ShelterForm";
import DailyForm from "./form/DailyForm";

// Zod 스키마 정의 - 각 입력값에 대한 유효성 검사 설정
const EditSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "내용을 입력해주세요"),
});

// 스키마 기반 타입 정의 - 리훅폼과 타입 연결
export type FormData = z.infer<typeof EditSchema>;

function PostCreateEdit() {
  const router = useRouter();
  const { toast } = useToast();

  // useForm 훅으로 폼 설정 - zodResolver를 통해 Zod 유효성 검사 연결
  const form = useForm<FormData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      title: "",
      contents: "",
    },
  });

  // 상태값으로 카테고리 구분 - shelter(대피소) or daily(일상)
  const [category, setCategory] = useState<"shelter" | "daily">("shelter"); // shelter가 디폴트

  // DB에 게시글 저장하는 함수 - 카테고리에 따라 해당 테이블에 저장
  const handleInsert = async (userId: string, values: FormData) => {
    const tempUserId = "c785ad0d-bb9c-45ef-9c01-532e1117ba66"; // 나는 바보입니다. 왜 안되지 했더니 supabase 정책은  (auth.uid() = user_id) 넣어두곤 여기 비워둠요..

    if (category === "shelter") {
      return await supabase.from("shelter_post").insert({
        user_id: tempUserId,
        title: values.title,
        contents: values.contents,
      });
    } else {
      return await supabase.from("daily_post").insert({
        user_id: tempUserId,
        title: values.title,
        contents: values.contents,
        img_url: "",
      });
    }
  };

  // 등록 함수 - 유효성 통과 시 실행 (DB 저장 및 결과 처리)
  const onSubmit = async (values: FormData) => {
    console.log("🔥 onSubmit 실행됨", values); // onSubmit이 호출되었는지 확인

    // 🧪 로그인 없이 개발자용 임시 ID로 insert 테스트
    const insertResult = await handleInsert("dev-user-id-placeholder", values);
    console.log("🔥 insert 결과:", insertResult);

    if (insertResult.error) {
      const errorMessage =
        insertResult.error?.message ?? "알 수 없는 오류가 발생했습니다.";
      console.error("insert 실패 사유:", errorMessage);
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

  return (
    // Form 컴포넌트로 전체 폼 상태를 context로 전달
    <Form {...form}>
      {/* 실제 form 태그 */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 카테고리 선택, 등록 버튼 */}
        <div className="flex items-center justify-between">
          {/* 탭 전환 UI - 타입 사용하여 에러 방지 */}
          <Tabs
            value={category}
            onValueChange={value => setCategory(value as "shelter" | "daily")}
          >
            <TabsList>
              <TabsTrigger value="shelter">대피소</TabsTrigger>
              <TabsTrigger value="daily">일상</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 등록 버튼 */}
          <Button type="submit">등록</Button>
        </div>

        {/* 카테고리에 따라 폼 필드 렌더링 */}
        {category === "shelter" ? (
          <ShelterForm form={form} />
        ) : (
          <DailyForm form={form} />
        )}
      </form>
    </Form>
  );
}

export default PostCreateEdit;
