import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import { PostType } from "@/types/reports";

interface ReportButtonProps {
  postId: number | null;
  postType: PostType;
}

const ReportButton = ({ postId, postType }: ReportButtonProps) => {
  const [isReported, setIsReported] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const supabase = createClient();
  const userData = getUserData();

  useEffect(() => {
    const checkIfReported = async () => {
      if (!postId) return;
      
      const { user } = await userData;
      if (!user) return;
      
      // 이미 신고했는지 확인
      const { data, error } = await supabase
        .from("reports")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("신고 상태 확인 오류:", error);
        return;
      }

      setIsReported(!!data);
    };

    checkIfReported();
  }, [postId, postType, userData, supabase]);

  const handleReportClick = async () => {
    const { user } = await userData;
    
    if (!user) {
      setIsDrawerOpen(true);
      return;
    }
    
    if (!postId) return;
    
    // 이미 신고한 경우
    if (isReported) {
      alert("이미 신고한 게시물입니다.");
      return;
    }
    
  };

  return (
    <>
      <button
        type="button"
        onClick={handleReportClick}
        className={`px-1 py-0.5 text-sm ${
          isReported ? "text-red-500" : "text-gray-500"
        }`}
        disabled={isReported}
      >
        {isReported ? "신고됨" : "신고하기"}
      </button>
      
      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default ReportButton;