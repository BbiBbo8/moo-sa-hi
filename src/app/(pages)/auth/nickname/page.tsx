"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import NicknameForm from "@/components/auth/NicknameForm";

export default function NicknamePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">닉네임 등록</h1>
      {userId ? (
        <NicknameForm userId={userId} />
      ) : (
        <p>로그인 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}