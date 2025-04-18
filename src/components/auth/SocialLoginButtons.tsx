"use client";

import createClient from "@/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

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
    <div className="w-full">

      <div className="flex flex-col gap-3">
        {/* 카카오 로그인 */}
        <button
          onClick={() => handleLogin("kakao")}
          className="flex items-center justify-center gap-2 rounded-md bg-[#FEE500] py-3 text-sm font-bold text-[#3C1E1E] shadow"
        >
          <RiKakaoTalkFill size={20} />
          카카오로 로그인하기
        </button>

        {/* 구글 로그인 */}
        <button
          onClick={() => handleLogin("google")}
          className="flex items-center justify-center gap-2 rounded-md bg-white py-3 text-sm font-medium text-[#555] shadow border"
        >
          <FcGoogle size={20} />
          구글로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;