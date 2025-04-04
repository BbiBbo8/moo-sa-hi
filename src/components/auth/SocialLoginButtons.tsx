"use client";

import { supabase } from "@/supabase/client";
import { Button } from "@/components/ui/button";

function SocialLoginButtons() {
  const handleLogin = async (provider: "google" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
  };
  return (
    <div>
      <div>
        <Button onClick={() => handleLogin("google")}>구글로그인</Button>
        <Button onClick={() => handleLogin("kakao")}>카카오로그인</Button>
      </div>
    </div>
  );
}
export default SocialLoginButtons;
