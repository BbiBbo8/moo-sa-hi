import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import ReportModal from "@/components/report/ReportModal";
import { PostType } from "@/types/reports";
import { toast } from "sonner";

interface ReportButtonProps {
  postId: number | null; // 신고 대상 게시글 ID
  postType: PostType;    // 게시글 타입 ('daily' 또는 'shelter')
}

const ReportButton = ({ postId, postType }: ReportButtonProps) => {
  const [isReported, setIsReported] = useState(false);        // 이미 신고했는지 여부
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);    // 로그인 드로어 표시 여부
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 표시 여부
  const supabase = createClient();                            // Supabase 클라이언트
  const userData = getUserData();                            // 사용자 정보 가져오는 훅

  useEffect(() => {
    const checkIfReported = async () => {
      if (!postId) return; // 게시글 ID가 없으면 중단

      const { user } = await userData; // 현재 사용자 정보
      if (!user) return; // 사용자 정보 없으면 중단

      // 게시글 타입에 따라 필터 조건 설정
      const reportFilter =
        postType === "daily"
          ? { user_id: user.id, daily_post_id: postId }
          : { user_id: user.id, shelter_post_id: postId };

      // Supabase에서 신고 기록 조회
      const { data, error } = await supabase
        .from("reports")
        .select("id")
        .eq(Object.keys(reportFilter)[0], Object.values(reportFilter)[0]) // 동적 필드 이름 사용
        .eq("user_id", user.id)
        .maybeSingle(); // 단일 결과만 기대

      if (error) {
        console.error("신고 상태 확인 오류:", error);
        return;
      }

      setIsReported(!!data); // 결과가 있으면 true, 없으면 false
    };

    checkIfReported(); // 컴포넌트 마운트 시 및 의존성 배열 변경 시 실행
  }, [postId, postType, userData, supabase]); // 의존성 배열

  const handleReportClick = async () => {
    const { user } = await userData; // 현재 사용자 정보
    if (!user) {
      setIsDrawerOpen(true); // 로그인 드로어 표시
      return;
    }
    if (!postId) return; // 게시글 ID 없으면 중단
    if (isReported) {
      toast.error("이미 신고한 게시물입니다."); // 토스트 메시지 표시
      return;
    }
    setIsReportModalOpen(true); // 신고 모달 표시
  };

  const handleReportModalClose = () => {
    setIsReportModalOpen(false); // 신고 모달 숨김
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
          isReported ? "text-red-500" : "text-gray-500" // 신고 여부에 따른 스타일
        }`}
        disabled={isReported} // 이미 신고했으면 비활성화
      >
        {isReported ? "신고됨" : "신고하기"} // 신고 여부에 따른 텍스트
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