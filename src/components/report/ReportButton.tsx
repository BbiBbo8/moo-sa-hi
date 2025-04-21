import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import ReportModal from "@/components/report/ReportModal";
import { PostType } from "@/types/reports";
import { toast } from "sonner";

interface ReportButtonProps {
  postId: number | null; 
  postType: PostType;    // 게시글 타입 ('daily' 또는 'shelter')
}

const ReportButton = ({ postId, postType }: ReportButtonProps) => {
  const [isReported, setIsReported] = useState(false);        // 이미 신고했는지 여부
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);    
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); 
  const supabase = createClient();                            
  const userData = getUserData();                            

  useEffect(() => {
    const checkIfReported = async () => {
      if (!postId) return; 

      const { user } = await userData; 
      if (!user) return; 

      // 게시글 타입에 따라 필터 조건 설정
      const reportFilter =
        postType === "daily"
          ? { user_id: user.id, daily_post_id: postId }
          : { user_id: user.id, shelter_post_id: postId };

      // 신고 기록 조회
      const { data, error } = await supabase
        .from("reports")
        .select("id")
        .eq(Object.keys(reportFilter)[0], Object.values(reportFilter)[0]) // 동적 필드 이름 사용
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("신고 상태 확인 오류:", error);
        return;
      }

      setIsReported(!!data); // 결과가 있으면 true, 없으면 false
    };

    checkIfReported(); // 컴포넌트 마운트 시 및 의존성 배열 변경 시 실행
  }, [postId, postType, userData, supabase]); // 의존성 배열

  const handleReportClick = async () => {
    const { user } = await userData; 
    if (!user) {
      setIsDrawerOpen(true); 
      return;
    }
    if (!postId) return; 
    if (isReported) {
      toast.error("이미 신고한 게시물입니다.");
      return;
    }
    setIsReportModalOpen(true); 
  };

  const handleReportModalClose = () => {
    setIsReportModalOpen(false); 
  };

  const handleReportSuccess = () => {
    setIsReported(true);           // 신고 상태 업데이트
    setIsReportModalOpen(false);   // 신고 모달 숨김
  };

  return (
    <>
      <button
        type="button"
        onClick={handleReportClick}
        className={`px-1 py-0.5 text-sm ${
          isReported ? "text-red-500" : "text-gray-500" 
        }`}
        disabled={isReported} // 이미 신고했으면 비활성화
      >
        {isReported ? "신고완료" : "신고하기"}
      </button>

      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />

      {/* 신고 모달 */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={handleReportModalClose}
        postId={postId}
        postType={postType}
        onReportSubmitted={handleReportSuccess} // 신고 성공 시 콜백
      />
    </>
  );
};

export default ReportButton;