'use client';

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PATH from "@/constants/PATH";

export default function LogoutButton() {

  const handleLogout = async () => {
    const res = await fetch("/api/signout", { method: "POST" });

    if (res.ok) {
      toast.success("로그아웃 성공");
      setTimeout(() => {
        window.location.href = PATH.HOME;
      }, 500);
    } else {
      toast.error("로그아웃 실패");
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="h-fit px-3 text-[#999999]"
    >
      로그아웃
    </Button>
  );
}