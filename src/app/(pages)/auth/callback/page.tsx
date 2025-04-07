"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      router.replace("/auth/auth-code-error");
      return;
    }

    supabase.auth.setSession({ access_token, refresh_token }).then(async ({ error }) => {
      if (error) {
        console.error("세션 설정 실패:", error);
        return router.replace("/auth/auth-code-error");
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: existingUser } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user?.id)
        .single();

      router.replace(existingUser?.nickname ? "/" : "/auth/nickname");
    });
  }, []);

  return <div className="p-6 text-center">로그인 처리 중...</div>;
}