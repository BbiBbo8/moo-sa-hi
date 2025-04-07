"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase/client";

export default function KakaoLoginButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={login} className="bg-yellow-300 text-black">
      카카오 로그인
    </Button>
  );
}