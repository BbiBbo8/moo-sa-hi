'use client';

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PATH from "@/constants/PATH";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });

    if (res.ok) {
      toast.success("로그아웃 성공");
      router.push(PATH.HOME);
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