"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import NicknameForm from "@/components/auth/NicknameForm";

export default function NicknamePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // 현재 세션에서 유저 ID 가져오기
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (user) setUserId(user.id);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">닉네임 등록</h1>
      {/* userId가 있을 때만 닉네임 폼 렌더링 */}
      {userId ? <NicknameForm userId={userId} /> : <p>세션 확인 중...</p>}
    </div>
  );
}