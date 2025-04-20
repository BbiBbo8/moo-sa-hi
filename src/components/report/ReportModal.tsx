import { useState } from "react";
import { PostType } from "@/types/reports";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number | null;
  postType: PostType;
  onReportSubmitted?: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  postId,
  postType,
  onReportSubmitted,
}) => {
  const [reason, setReason] = useState(""); // 신고 사유
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 여부
  const supabase = createClient(); // Supabase 클라이언트
  const userData = getUserData(); // 사용자 정보 가져오는 훅

  const handleSubmitReport = async () => {
    // 신고 제출 처리 함수
    const { user } = await userData; // 현재 사용자 정보 가져오기
    if (!user) {
      // 로그인되지 않은 경우
      toast.error("로그인이 필요합니다."); // 토스트 메시지 표시
      return;
    }
  
    if (!reason.trim()) {
      // 신고 사유가 비어있는 경우
      toast.error("신고 사유를 입력해주세요."); // 토스트 메시지 표시
      return;
    }
  
    setIsSubmitting(true); // 제출 중 상태로 변경
  
    const reportData: {
      user_id: string;
      reason: string;
      daily_post_id?: number | null; 
      shelter_post_id?: number | null;
    } = {
      user_id: user.id,
      reason: reason,
    };
  
    if (postType === "daily") {
      // 게시글 타입이 daily인 경우 daily_post_id 추가
      reportData["daily_post_id"] = postId;
    } else if (postType === "shelter") {
      // 게시글 타입이 shelter인 경우 shelter_post_id 추가
      reportData["shelter_post_id"] = postId;
    }
  
    try {
      // Supabase Function 호출하여 신고 데이터 제출
      const { error } = await supabase.functions.invoke("submit-report", {
        body: JSON.stringify(reportData),
      });
  
      if (error) {
        // Function 호출 실패한 경우
        console.error("신고 제출 오류:", error); // 에러 로그 출력
        toast.error("신고 제출에 실패했습니다. 잠시 후 다시 시도해주세요."); // 토스트 메시지 표시
      } else {
        // Function 호출 성공한 경우
        toast.success("신고가 접수되었습니다."); // 토스트 메시지 표시
        setReason(""); // 신고 사유 초기화
        setIsSubmitting(false); // 제출 중 상태 해제
        if (onReportSubmitted) {
          // 부모 컴포넌트에 알림
          onReportSubmitted();
        } else {
          onClose(); // 모달 닫기
        }
      }
    } catch (error: any) {
      // 예외 발생한 경우
      console.error("Supabase Function 호출 오류:", error); // 에러 로그 출력
      toast.error("신고 처리 중 오류가 발생했습니다."); // 토스트 메시지 표시
    } finally {
      setIsSubmitting(false); // 제출 중 상태 해제 (항상 실행)
    }
  };

  if (!isOpen) {
    return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  }

  return (
    <>
      {/* 배경 흐림 효과 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose} // 배경 클릭 시 모달 닫기
      ></div>
      {/* 모달 내용 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-11/12 max-w-md bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">게시글 신고</h2>
          <textarea
            className="w-full h-24 p-2 border rounded-md mb-3 text-sm"
            placeholder="신고 사유를 상세히 작성해주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-2 text-gray-500 bg-gray-200 rounded-md text-sm hover:bg-gray-300 disabled:opacity-50"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="button"
              className="px-3 py-2 text-blue-500 bg-blue-100 rounded-md text-sm hover:bg-blue-200 disabled:opacity-50"
              onClick={handleSubmitReport} // 신고 제출 함수 호출
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "신고 제출"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;