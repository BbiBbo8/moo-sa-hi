import { NextResponse } from "next/server";
import { createClient } from "@/supabase/serverClient"; 
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient(cookies); // 쿠키 기반 서버 클라이언트
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 세션 교환 후 → 유저 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        const redirectPath = existingUser ? "/" : "/auth/nickname";

        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}