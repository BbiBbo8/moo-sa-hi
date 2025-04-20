import { useState } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import { PostType } from "@/types/reports";

interface ReportButtonProps {
  postId: number | null;
  postType: PostType;
}

const ReportButton = ({ postId, postType }: ReportButtonProps) => {
  const [isReported, setIsReported] = useState(false);
  
  const handleReportClick = async () => {
    console.log(`신고 버튼 클릭: ${postType} 게시물 ID ${postId}`);
  };

  return (
    <button
      type="button"
      onClick={handleReportClick}
      className="px-1 py-0.5 text-sm text-gray-500"
    >
      신고하기
    </button>
  );
};

export default ReportButton;