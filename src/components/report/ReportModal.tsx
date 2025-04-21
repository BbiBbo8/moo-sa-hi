import React, { useState, useCallback } from "react";
import { PostType, ReportData } from "@/types/reports";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫는 함수
  postId: number | null; // 신고할 게시글 ID
  postType: PostType; // 신고할 게시글 타입
  onReportSubmitted?: () => void; // 신고 성공 콜백 (선택 사항)
}

const ReportModal: React.FC<ReportModalProps> = React.memo(
  ({ isOpen, onClose, postId, postType, onReportSubmitted }) => {
    const [reason, setReason] = useState(""); // 신고 사유 상태
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
    const supabase = createClient(); // Supabase 클라이언트 생성
    // NOTE: ShelterPostButton과 동일하게 getUserData가 안정적인지 확인 필요
    const userData = getUserData(); // 사용자 정보 가져오기

    // 신고 제출 처리 함수
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
      // postId가 null인 경우 신고 불가
      if (postId === null) {
        console.error("신고 불가: 게시글 ID가 없습니다.");
        toast.error("게시글 정보를 찾을 수 없습니다.");
        return;
      }

      setIsSubmitting(true);
      const reportData: ReportData = { user_id: user.id, reason: reason };

      // 게시글 타입에 따라 외래 키 설정
      if (postType === "daily") {
        reportData.daily_post_id = postId;
        reportData.shelter_post_id = null; // 다른 외래 키는 null로 명시
      } else if (postType === "shelter") {
        reportData.shelter_post_id = postId;
        reportData.daily_post_id = null; // 다른 외래 키는 null로 명시
      } else {
        console.error("알 수 없는 게시글 타입:", postType);
        toast.error("알 수 없는 게시글 타입입니다.");
        setIsSubmitting(false);
        return;
      }

      try {
        await supabase.from("reports").insert([reportData]);
        toast.success("신고가 완료되었습니다.");
        setReason(""); // 성공 시 신고 사유 초기화
        // onReportSubmitted 콜백이 있으면 호출, 없으면 모달 닫기
        if (onReportSubmitted) onReportSubmitted();
        else onClose();
      } catch {
        // 에러 로깅이 필요하다면 catch (error) { console.error(error); ... } 형태로 수정
        toast.error("신고에 실패했습니다.");
      } finally {
        setIsSubmitting(false); // 제출 상태 종료
      }
    }, [userData, reason, postId, postType, onReportSubmitted, onClose, supabase]); // useCallback 의존성 배열에 supabase 추가

    // 모달이 닫혀있으면 null 반환
    if (!isOpen) return null;

    return (
      <>
        {/* 모달 배경 */}
        <div
          className="bg-opacity-25 fixed inset-0 z-40 backdrop-blur-sm"
          onClick={isSubmitting ? undefined : onClose} // 제출 중에는 닫기 방지
        ></div>
        {/* 모달 창 */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-11/12 max-w-md rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-3 text-lg font-semibold">게시글을 신고하시겠습니까?</h2>
            {/* 신고 사유 입력란 */}
            <textarea
              className="mb-3 h-24 w-full rounded-md border p-2 text-sm"
              placeholder="신고 사유를 상세히 작성해주세요."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isSubmitting} // 제출 중에는 입력 비활성화
            />
            {/* 액션 버튼 그룹 */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-[#666666] border border-[#666666]"
                onClick={onClose}
                disabled={isSubmitting} // 제출 중에는 취소 불가
              >
                취소
              </button>
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-[#EA3436] border border-[#EA3436]"
                onClick={handleSubmitReport}
                disabled={isSubmitting || !reason.trim() || postId === null} // 제출 중이거나 사유가 없거나 postId가 없으면 비활성화
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

ReportModal.displayName = "ReportModal"; // React.memo로 감싸진 컴포넌트의 displayName 설정

export default ReportModal;