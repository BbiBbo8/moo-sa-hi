import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createClient from "./src/supabase/client"; // 프로젝트 구조에 맞춘 경로

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createClient();

  // getUser()로 로그인 여부 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 안 되어있고, /post-create 경로에 접근하면 /login으로 이동
  if (!user && req.nextUrl.pathname.startsWith("/post-create")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// middleware가 적용될 경로
export const config = {
  matcher: ["/post-create"],
};
