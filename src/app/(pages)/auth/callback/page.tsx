"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from "@/supabase/client";

const CallbackPage = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase 세션 가져오기
      const { data: { session }, error } = await supabase.auth.getSession();

      // 유저 정보 확인
      const user = session?.user;
      if (error || !user) {
        console.error("세션 없음 또는 인증 실패", error);
        router.replace("/auth/auth-code-error");
        return;
      }

      // users 테이블에서 현재 유저 조회
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .maybeSingle();

      if (fetchError) {
        console.error("유저 조회 실패", fetchError);
        router.replace("/auth/auth-code-error");
        return;
      }

      // 유저가 없으면 users 테이블에 신규 삽입
      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          nickname: "",
        });

        if (insertError) {
          console.error("유저 삽입 실패", insertError);
          router.replace("/auth/auth-code-error");
          return;
        }

        // 닉네임 등록 페이지로 이동
        router.replace("/auth/nickname");
        return;
      }

      // 닉네임 존재 여부에 따라 홈 또는 닉네임 등록 페이지로 이동
      router.replace(existingUser.nickname ? "/" : "/auth/nickname");
    };

    // useEffect 내부에서 비동기 함수 실행
    handleCallback();
  }, [router, supabase]);

  return <div className="p-6 text-center">로그인 처리 중...</div>;
};

export default CallbackPage;