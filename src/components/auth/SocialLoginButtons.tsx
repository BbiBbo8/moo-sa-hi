"use client";

import createClient from "@/supabase/client";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

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
    <div className="flex justify-center gap-6">
      {/* Google 로그인 */}
      <button
        onClick={() => handleLogin("google")}
        className="w-14 h-14 bg-white rounded-full border flex items-center justify-center shadow"
        aria-label="구글 로그인"
      >
        <FcGoogle size={24} />
      </button>

      {/* Kakao 로그인 */}
      <button
        onClick={() => handleLogin("kakao")}
        className="w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center shadow"
        aria-label="카카오 로그인"
      >
        <Image
          src="/kakao_logo.png"
          alt="Kakao"
          width={22}
          height={22}
        />
      </button>
    </div>
  );
}