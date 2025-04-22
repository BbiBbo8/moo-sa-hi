import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../../database.types";

// client createClient와 겹치지 않도록 임시로 수정해두었음
const createSC = async () => {
  // 서버 컴포넌트나 layout, SSR 페이지 등에서만 사용
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            console.error(
              "서버 클라이언트에서 쿠키 설정 중 오류 발생 ==> ",
              error,
            );
          }
        },
      },
    },
  );
};

export default createSC;
