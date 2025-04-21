import { useState } from "react";
import { PostType } from "@/types/reports";
import createClient from "@/supabase/client"; // Supabase 클라이언트 import
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
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient(); // Supabase 클라이언트 인스턴스 생성
  const userData = getUserData();

  const handleSubmitReport = async () => {
    const { user } = await userData;
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    if (!reason.trim()) {
      toast.error("신고 사유를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

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
      reportData.daily_post_id = postId;
    } else if (postType === "shelter") {
      reportData.shelter_post_id = postId;
    }

    try {
      // Supabase 클라이언트를 사용하여 reports 테이블에 데이터 삽입
      const { error } = await supabase.from("reports").insert([reportData]);

      if (error) {
        console.error("신고 제출 오류:", error);
        toast.error("신고 제출에 실패했습니다.");
      } else {
        toast.success("신고가 접수되었습니다.");
        setReason("");
        setIsSubmitting(false);
        if (onReportSubmitted) {
          onReportSubmitted();
        } else {
          onClose();
        }
      }
    } catch (error: any) {
      console.error("Supabase 데이터베이스 오류:", error);
      toast.error("신고 처리 중 오류 발생.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
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
              onClick={handleSubmitReport}
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