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
  onReportSubmitted?: () => void; // 신고 성공 콜백
}

const ReportModal: React.FC<ReportModalProps> = React.memo(
  ({ isOpen, onClose, postId, postType, onReportSubmitted }) => {
    const [reason, setReason] = useState(""); // 신고 사유 상태
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
    const supabase = createClient(); // Supabase 클라이언트
    const userData = getUserData(); // 사용자 정보

    // 신고 제출 처리
    const handleSubmitReport = useCallback(async () => {
      const { user } = await userData;
      if (!user) {
        toast.error("로그인 필요");
        return;
      }
      if (!reason.trim()) {
        toast.error("사유 입력 필요");
        return;
      }

      setIsSubmitting(true);
      const reportData: ReportData = { user_id: user.id, reason: reason };
      if (postType === "daily") reportData.daily_post_id = postId;
      else if (postType === "shelter") reportData.shelter_post_id = postId;

      try {
        await supabase.from("reports").insert([reportData]);
        toast.success("신고 완료");
        setReason("");
        setIsSubmitting(false);
        if (onReportSubmitted) onReportSubmitted();
        else onClose();
      } catch (error: any) {
        toast.error("신고 실패");
      } finally {
        setIsSubmitting(false);
      }
    }, [userData, reason, postId, postType, onReportSubmitted, onClose, supabase]);

    if (!isOpen) return null;

    return (
      <>
        {/* 모달 배경 */}
        <div
          className="bg-opacity-25 fixed inset-0 z-40 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        {/* 모달 창 */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-11/12 max-w-md rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-3 text-lg font-semibold">게시글을 신고하시겠습니까?</h2>
            {/* 신고 사유 입력 */}
            <textarea
              className="mb-3 h-24 w-full rounded-md border p-2 text-sm"
              placeholder="신고 사유를 상세히 작성해주세요."
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
            {/* 액션 버튼 */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-[#666666] border border-[#666666]"
                onClick={onClose}
                disabled={isSubmitting}
              >
                취소
              </button>
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