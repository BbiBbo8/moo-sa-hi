"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // URL 해시에서 access_token과 refresh_token 추출
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    // 토큰이 없으면 에러 페이지로 이동
    if (!access_token || !refresh_token) {
      router.replace("/auth/auth-code-error");
      return;
    }

    // Supabase 세션 설정
    supabase.auth.setSession({ access_token, refresh_token }).then(async ({ error }) => {
      if (error) {
        router.replace("/auth/auth-code-error");
        return;
      }

      // 현재 로그인된 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // users 테이블에서 사용자 정보 조회 (닉네임 등록 여부 확인)
      const { data: existingUser } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user?.id)
        .single();

      // 닉네임이 등록되어 있으면 홈으로, 아니면 닉네임 등록 페이지로 이동
      router.replace(existingUser?.nickname ? "/" : "/auth/nickname");
    });
  }, []);

  return <div className="p-6 text-center">로그인 처리 중...</div>;
}