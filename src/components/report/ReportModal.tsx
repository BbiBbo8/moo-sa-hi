import { useState } from "react";
import { PostType } from "@/types/reports";

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
            onClick={() => {
              // 실제 신고 로직 (다음 커밋에서 구현)
              console.log("신고 제출:", { postId, postType, reason });
              setIsSubmitting(true);
              setTimeout(() => {
                setIsSubmitting(false);
                if (onReportSubmitted) {
                  onReportSubmitted();
                }
                onClose();
              }, 500);
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "신고 제출"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;