"use client"; // 로그인 버튼 컴포넌트가 클라이언트 컴포넌트이기 때문에 무조건 client.ts를 사용

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import createClient from "@/supabase/client";
import PATH from "@/constants/PATH";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 실패:", error.message);
      return;
    }
    toast.success("로그아웃 성공");
    router.push(PATH.HOME); // 로그아웃 후에 랜딩페이지로 이동
    location.reload(); // 페이지 새로고침    
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default LogoutButton;