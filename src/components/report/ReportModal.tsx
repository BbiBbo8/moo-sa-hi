import React, { useState, useCallback } from "react";
import { PostType, ReportData } from "@/types/reports";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean; // 모달 열림/닫힘 상태
  onClose: () => void; // 모달 닫는 함수
  postId: number | null; // 신고할 게시글 ID
  postType: PostType; // 신고할 게시글 타입 ('daily' 또는 'shelter')
  onReportSubmitted?: () => void; // 신고 성공 시 호출할 함수 (선택 사항)
}

const ReportModal: React.FC<ReportModalProps> = React.memo(
  ({ isOpen, onClose, postId, postType, onReportSubmitted }) => {
    const [reason, setReason] = useState(""); // 사용자가 입력한 신고 사유
    const [isSubmitting, setIsSubmitting] = useState(false); // 신고 제출 중 상태
    const supabase = createClient(); // Supabase 클라이언트 생성
    const userData = getUserData(); // 현재 사용자 정보 가져오기

    // 신고 제출 처리 함수 (한 번만 생성되도록 useCallback 사용)
    const handleSubmitReport = useCallback(async () => {
      const { user } = await userData;
      if (!user) {
        toast.error("로그인이 필요합니다.");
        return;
      }
      if (!reason.trim()) {
        toast.error("신고 사유를 입력해주세요.");
        return;
      }

      setIsSubmitting(true); // 제출 시작

      // 신고 데이터 객체 생성
      const reportData: ReportData = {
        user_id: user.id,
        reason: reason,
      };
      if (postType === "daily") reportData.daily_post_id = postId;
      else if (postType === "shelter") reportData.shelter_post_id = postId;

      try {
        // Supabase 'reports' 테이블에 데이터 삽입
        const { error } = await supabase.from("reports").insert([reportData]);
        if (error) {
          console.error("신고 제출 오류:", error);
          toast.error("신고 제출에 실패했습니다.");
        } else {
          toast.success("신고가 접수되었습니다.");
          setReason(""); // 입력 필드 초기화
          setIsSubmitting(false); // 제출 완료
          if (onReportSubmitted)
            onReportSubmitted(); // 성공 콜백 호출
          else onClose(); // 기본 닫기 처리
        }
      } catch (error: any) {
        console.error("Supabase 데이터베이스 오류:", error);
        toast.error("신고 처리 중 오류 발생.");
      } finally {
        setIsSubmitting(false); // 최종적으로 제출 상태 초기화
      }
    }, [
      userData,
      reason,
      postId,
      postType,
      onReportSubmitted,
      onClose,
      supabase,
    ]);

    // 모달이 닫혔으면 렌더링하지 않음
    if (!isOpen) return null;

    return (
      <>
        {/* 모달 배경 */}
        <div
          className="bg-opacity-25 fixed inset-0 z-40 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        {/* 모달 내용 컨테이너 */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 모달 창 */}
          <div className="relative w-11/12 max-w-md rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-3 text-lg font-semibold">게시글을 신고하시겠습니까?</h2>
            {/* 신고 사유 입력 텍스트 영역 */}
            <textarea
              className="mb-3 h-24 w-full rounded-md border p-2 text-sm"
              placeholder="신고 사유를 상세히 작성해주세요."
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
            {/* 액션 버튼 그룹 */}
            <div className="flex justify-end gap-2">
              {/* 취소 버튼 */}
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-[#666666] border border-[#666666]"
                onClick={onClose}
                disabled={isSubmitting}
              >
                취소
              </button>
              {/* 신고 제출 버튼 */}
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-[#EA3436] border border-[#EA3436]"
                onClick={handleSubmitReport}
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "신고하기"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  },
);

export default ReportModal;
