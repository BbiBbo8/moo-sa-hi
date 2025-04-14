import { redirect } from "next/navigation";
import createSC from "@/supabase/server";

const CallbackPage = async () => {
  const supabase = await createSC();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("세션 없음 또는 인증 실패", error);
    redirect("/auth/auth-code-error");
  }

  // users 테이블 조회
  const { data: existingUser } = await supabase
    .from("users")
    .select("nickname")
    .eq("id", user.id)
    .maybeSingle();

  // 유저 없으면 자동 삽입
  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      nickname: "",
    });

    if (insertError) {
      console.error("유저 삽입 실패", insertError);
      redirect("/auth/auth-code-error");
    }

    redirect("/auth/nickname");
  }

  // 닉네임 여부에 따라 라우팅
  redirect(existingUser.nickname ? "/" : "/auth/nickname");
};

export default CallbackPage;