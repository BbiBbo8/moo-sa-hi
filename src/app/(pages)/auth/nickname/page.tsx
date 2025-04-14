import { redirect } from "next/navigation";
import createSC from "@/supabase/server";
import NicknameForm from "@/components/auth/NicknameForm";

const NicknamePage = async () => {
  const supabase = await createSC();

  // 세션 에서 사용자 정보 가져오기
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("세션 없음 또는 인증 실패:", error?.message);
    // 인증 실패 시 리디렉트
    redirect("/auth/auth-code-error");
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">닉네임 등록</h1>
      <NicknameForm userId={user.id} />
    </div>
  );
};

export default NicknamePage;