import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../database.types";

export function createClient() {
  // "use client"가 붙은 컴포넌트나 브라우저에서 유저 인터랙션(예: 로그인, 로그아웃, 게시글 작성 등)이 발생하는 경우 사용
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
