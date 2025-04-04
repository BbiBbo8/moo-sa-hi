"use client";

import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  userId: string;
}

export default function NicknameForm({ userId }: Props) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("users").insert({
      id: userId,
      nickname,
    });

    setLoading(false);

    if (error) {
      alert("닉네임 등록 중 오류가 발생했습니다.");
    } else {
      router.push("/"); // 등록 완료 후 홈으로 이동
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "등록 중..." : "닉네임 등록"}
      </Button>
    </form>
  );
}