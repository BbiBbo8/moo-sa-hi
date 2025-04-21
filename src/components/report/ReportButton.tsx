import React, { useState, useEffect, useCallback } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import ReportModal from "@/components/report/ReportModal";
import { PostType } from "@/types/reports";
import { toast } from "sonner";
import { SupabaseClient } from "@supabase/supabase-js"; // SupabaseClient 타입 import

interface ReportButtonProps {
  postId: number | null;
  postType: PostType;
}

const ReportButton = ({ postId, postType }: ReportButtonProps) => {
  const [isReported, setIsReported] = useState(false); // 이미 신고했는지 여부
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 로그인 드로어 표시 여부
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 표시 여부
  const supabase = createClient();
  const userData = getUserData();

  // 신고 여부 확인 함수 (메모이제이션)
  const checkIfReported = useCallback(
    async (
      client: SupabaseClient,
      userId: string | undefined,
      pId: number | null,
      pType: PostType
    ) => {
      if (!pId || !userId) return false; // 게시글 ID나 사용자 ID 없으면 false 반환

      let query = client.from("reports").select("id").eq("user_id", userId); // 기본 쿼리

      if (pType === "daily") {
        query = query.eq("daily_post_id", pId); // daily 포스트 필터
      } else {
        query = query.eq("shelter_post_id", pId); // shelter 포스트 필터
      }

      const { data, error } = await query.maybeSingle(); // 단일 결과 조회

      if (error) {
        console.error("신고 상태 확인 오류:", error);
        return false;
      }

      return !!data; // 결과 존재 여부 반환
    },
    [] // 의존성 배열 비어있음 (한 번만 생성)
  );

  useEffect(() => {
    let isMounted = true; // 컴포넌트 마운트 여부 추적

    const checkReportStatus = async () => {
      const { user } = await userData; // 사용자 정보 가져오기
      if (!user || !postId || !isMounted) return; // 필수 정보 없거나 언마운트 시 중단

      const reported = await checkIfReported(supabase, user.id, postId, postType); // 신고 여부 확인
      if (isMounted) setIsReported(reported); // 마운트 시에만 상태 업데이트
    };

    checkReportStatus();

    return () => {
      isMounted = false; // 언마운트 시 플래그 설정
    };
  }, [postId, postType, userData, supabase, checkIfReported]); // 의존성 배열

  // 신고 버튼 클릭 핸들러 (메모이제이션)
  const handleReportClick = useCallback(async () => {
    const { user } = await userData; // 사용자 정보 가져오기
    if (!user) {
      setIsDrawerOpen(true); // 로그인 필요
      return;
    }
    if (!postId) return; // 게시글 ID 없으면 중단
    if (isReported) {
      toast.error("이미 신고한 게시물입니다."); // 중복 신고 방지
      return;
    }
    setIsReportModalOpen(true); // 신고 모달 열기
  }, [userData, postId, isReported]); // 의존성 배열

  const handleReportModalClose = () => { // 모달 닫기 핸들러
    setIsReportModalOpen(false);
  };

  const handleReportSuccess = () => { // 신고 성공 시 처리
    setIsReported(true); // 신고 상태 업데이트
    setIsReportModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <button
        type="button"
        onClick={handleReportClick}
        className={`px-1 py-0.5 text-sm ${
          isReported ? "text-red-500" : "text-gray-500" // 신고 여부에 따른 텍스트 색상
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