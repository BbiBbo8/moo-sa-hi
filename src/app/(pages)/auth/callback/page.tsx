"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from "@/supabase/client";
import PATH from "@/constants/PATH";

const CallbackPage = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("로그인 실패 또는 유저 없음", error);
        router.replace(PATH.AUTHERROR);
        return;
      }

      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error("유저 조회 실패", userError);
        router.replace("/auth/auth-code-error");
        return;
      }

      router.replace(existingUser?.nickname ? PATH.HOME : PATH.NICKNAME);
    };

    handleAuthCallback();
  }, []);

  return <div className="p-6 text-center">로그인 처리 중...</div>;
};

export default CallbackPage;
