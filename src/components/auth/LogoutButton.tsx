"use client";

import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("로그아웃 실패:", error.message);
            return}
        router.push("/"); // 로그아웃 후에 랜딩페이지로 이동
        }
    return (
        <button onClick={handleLogout}>로그아웃</button>
    )
}