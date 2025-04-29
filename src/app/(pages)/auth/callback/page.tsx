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
      // 세션에서 로그인된 유저 정보 가져오기
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      const user = session?.user;

      // 인증 에러 처리
      if (error || !user) throw new Error("인증 실패");

      // users 테이블에서 해당 유저의 nickname을 조회
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();

      // 유저 조회 실패 에러 처리
      if (fetchError) throw new Error("유저 조회 실패");

      // 유저 정보가 존재하지 않으면 새로 삽입
      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          nickname: "",
        });

        // 정보 삽입 실패 에러 처리
        if (insertError) throw new Error("유저 정보 실패");

        // 삽입 완료 후 닉네임 등록 페이지로 이동
        return { redirectTo: "/auth/nickname" };
      }

      // 기존 유저가 존재하면 닉네임 유무에 따라 라우팅 (랜딩/닉네임)
      return { redirectTo: existingUser.nickname ? "/" : "/auth/nickname" };
    },

    // 인증 성공 시 지정된 경로로 이동
    onSuccess: ({ redirectTo }) => {
      router.replace(redirectTo);
    },

    // 인증 실패 시 에러 안내 페이지로 이동
    onError: () => {
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