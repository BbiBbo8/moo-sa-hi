"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from "@/supabase/client";
import PATH from "@/constants/PATH";

export default function CallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user }, error }) => {
      if (error || !user) {
        console.error("로그인 실패 또는 유저 없음", error);
        router.replace(PATH.AUTHERROR);
        return;
      }

      const { data: existingUser } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();

      router.replace(existingUser?.nickname ? PATH.HOME : PATH.NICKNAME);
    });
  }, []);

  return <div className="p-6 text-center">로그인 처리 중...</div>;
}
