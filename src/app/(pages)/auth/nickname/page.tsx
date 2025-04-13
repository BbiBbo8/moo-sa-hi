"use client";

import { useEffect, useState } from "react";
import NicknameForm from "@/components/auth/NicknameForm";
import createClient from "@/supabase/client";

export default function NicknamePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("유저 정보 가져오기 실패:", error.message);
        return;
      }

      if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">닉네임 등록</h1>
      {userId ? <NicknameForm userId={userId} /> : <p>세션 확인 중...</p>}
    </div>
  );
}