"use client";

import createClient from "@/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkLine } from "react-icons/ri";

const SocialLoginButtons = () => {
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
        className="flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow"
        aria-label="구글 로그인"
      >
        <FcGoogle size={24} />
      </button>

      {/* Kakao 로그인 */}
      <button
        onClick={() => handleLogin("kakao")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] shadow"
        aria-label="카카오 로그인"
      >
        <RiKakaoTalkLine size={24} />
      </button>
    </div>
  );
};

export default SocialLoginButtons;