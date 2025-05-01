"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import createClient from "@/supabase/client";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();
  const supabase = createClient();

  // 소셜 로그인 후 콜백 처리를 위한 mutation 정의
  const { mutate: handleCallback } = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const user = session?.user;

      console.log("세션 정보:", session);
      if (sessionError || !user) {
        console.error("인증 실패:", sessionError);
        throw new Error("인증 실패");
      }

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();

      // 조회에 실패했거나 기존 유저가 없으면 삽입 시도
      if (fetchError || !existingUser) {
        const insertData = { id: user.id, nickname: "" };
        const { error: insertError } = await supabase
          .from("users")
          .insert(insertData);

        if (insertError) {
          console.error("유저 정보 삽입 실패:", insertError);
          throw new Error("유저 정보 삽입 실패"); // 삽입 실패 시에만 에러 던지기
        }
        return { redirectTo: "/auth/nickname" };
      }

      return { redirectTo: existingUser.nickname ? "/" : "/auth/nickname" };
    },
    onSuccess: ({ redirectTo }) => {
      router.replace(redirectTo);
    },
    onError: error => {
      console.error("콜백 처리 에러:", error);
      router.replace("/auth/auth-code-error");
    },
  });

  // 컴포넌트가 처음 마운트 될 때 콜백 처리
  useEffect(() => {
    handleCallback(); // 최초 진입 시!
  }, [handleCallback]);

  return <div className="p-6 text-center">로그인 처리 중...</div>;
};

export default CallbackPage;
