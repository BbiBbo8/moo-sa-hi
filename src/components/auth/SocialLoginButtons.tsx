"use client"; // 로그인 버튼 컴포넌트가 클라이언트 컴포넌트이기 때문에 무조건 client.ts를 사용

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import createClient from "@/supabase/client";

export default function SocialLoginButtons() {
  const supabase = createClient();
  const handleLogin = async (provider: "google" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 구글 로그인 버튼 */}
      <Button
        type="button"
        variant="outline"
        onClick={() => handleLogin("google")}
        className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-black hover:bg-gray-50"
      >
        <FcGoogle size={18} />
        구글 로그인
      </Button>

      {/* 카카오 로그인 버튼 */}
      <Button
        type="button"
        onClick={() => handleLogin("kakao")}
        className="flex items-center justify-center gap-2 bg-yellow-300 text-black hover:bg-yellow-400"
      >
        <Image src="/kakao_logo.png" alt="Kakao" width={18} height={18} />
        카카오 로그인
      </Button>
    </div>
  );
}
