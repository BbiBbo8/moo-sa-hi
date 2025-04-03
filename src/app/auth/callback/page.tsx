"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import NicknameForm from "@/components/auth/NicknameForm";

const callbackPage = () => {
  const [userId, setUserId] = useState<any | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          window.location.href = "/"; // 데이터가 이미 있다면 → 홈으로
        } else {
          setUserId(user.id); // 아니면 닉네임 등록 페이지로
        }
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <NicknameForm userId={userId} />
    </div>
  );
};
export default NicknameForm;