import Image from "next/image";
import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import ReportButton from "@/components/report/ReportButton";
import { toast } from "sonner";
import thumbsUpBlue from "public/icons/community/thumbs-up-blue.svg";
import thumbsUpGray from "public/icons/community/thumbs-up-gray.svg";

interface params {
  dailyPostId?: number | null;
}

// NOTE: 이후 tanStackQuery로 리팩토링 필요
const DailyPostButtons = ({ dailyPostId = null }: params) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const supabase = createClient();
  // NOTE: getUserData는 Promise를 반환하는 함수이므로 비동기 처리가 필요함
  const userData = getUserData();

  useEffect(() => {
    const fetchInitialHelpful = async () => {
      const { user } = await userData;

      // dailyPostId가 유효한 경우에만 데이터 fetching 시도
      if (dailyPostId) {
        if (user) {
          const { data: existingHelpful, error } = await supabase
            .from("helpfuls")
            .select("id")
            .eq("user_id", user.id)
            .eq("daily_post_id", dailyPostId)
            .maybeSingle();

          if (error) {
            console.error("유용해요 확인 오류:", error);
          }

          if (existingHelpful) {
            setIsHelpful(true);
          }
        }

        const { count, error: countError } = await supabase
          .from("helpfuls")
          .select("*", { count: "exact" })
          .eq("daily_post_id", dailyPostId);

        if (countError) {
          console.error("유용해요 개수 가져오기 오류:", countError);
        }

        if (count !== null) {
          setHelpfulCount(count);
        }
      } else {
        // dailyPostId가 아직 로딩되지 않았을 경우 또는 undefined인 경우
        setIsHelpful(false);
        setHelpfulCount(0); // 초기 helpfulCount를 0으로 설정하거나 유지
      }
    };

    fetchInitialHelpful();
  }, [dailyPostId, userData, supabase]);

  const handleHelpfulClick = async () => {
    const { user } = await userData;
    if (!user) {
      setIsDrawerOpen(true);
      return;
    }

    // dailyPostId가 null인 경우 처리
    if (dailyPostId === null) {
      console.error("유용해요 액션 불가: dailyPostId가 null입니다.");
      return;
    }

    // 낙관적 UI 업데이트
    const previousIsHelpful = isHelpful;
    const previousHelpfulCount = helpfulCount;
    setIsHelpful(!previousIsHelpful);
    setHelpfulCount(prevCount =>
      previousIsHelpful ? prevCount - 1 : prevCount + 1,
    );

    try {
      if (previousIsHelpful) {
        // 유용해요 취소
        const { error: deleteError } = await supabase
          .from("helpfuls")
          .delete()
          .eq("user_id", user.id)
          .eq("daily_post_id", dailyPostId);

        if (deleteError) {
          console.error("유용해요 삭제 오류:", deleteError);
          toast.error("유용해요 취소 실패");
          setIsHelpful(previousIsHelpful);
          setHelpfulCount(previousHelpfulCount);
        } else {
          toast.success("유용해요 취소");
        }
      } else {
        // 유용해요 등록
        const { error: insertError } = await supabase
          .from("helpfuls")
          .insert([
            {
              user_id: user.id,
              daily_post_id: dailyPostId,
              shelter_post_id: null,
            },
          ])
          .select();

        if (insertError) {
          console.error("유용해요 추가 오류:", insertError);
          toast.error("유용해요 추가 실패");
          setIsHelpful(previousIsHelpful);
          setHelpfulCount(previousHelpfulCount);
        } else {
          toast.success("유용해요");
        }
      }
    } catch (err) {
      console.error("유용해요 액션 중 예기치 않은 오류:", err);
      toast.error("작업 중 오류 발생");
      setIsHelpful(previousIsHelpful);
      setHelpfulCount(previousHelpfulCount);
    }
  };

  return (
    <>
      <section className="relative mb-12 flex w-full flex-row items-center">
        {/* 유용해요 버튼 */}
        <div className="absolute left-1/2 -translate-x-1/2">
          {/* shelterPostId가 유효할 때만 개수 표시 */}
          {isHelpful ? (
            <button
              onClick={handleHelpfulClick}
              className="border-primary text-primary flex h-10 items-center gap-0.5 rounded-md border-1 px-4 text-sm"
              // shelterPostId가 null이거나 초기 데이터 로딩 중에는 버튼 비활성화
              disabled={dailyPostId === null}
            >
              <Image src={thumbsUpBlue} alt="" width={24} height={24} />
              유용해요
              <span className="ml-1">{helpfulCount}</span>
            </button>
          ) : (
            <button
              onClick={handleHelpfulClick}
              className="flex h-10 items-center gap-0.5 rounded-md border-1 border-gray-200 px-4 text-sm text-gray-300"
              // shelterPostId가 null이거나 초기 데이터 로딩 중에는 버튼 비활성화
              disabled={dailyPostId === null}
            >
              <Image src={thumbsUpGray} alt="" width={24} height={24} />
              유용해요
              <span className="ml-1">{helpfulCount}</span>
            </button>
          )}
        </div>

        {/* 신고하기 버튼 */}
        <div className="absolute right-0">
          <ReportButton
            postId={dailyPostId}
            key={dailyPostId}
            postType="daily"
          />
        </div>
      </section>
      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default DailyPostButtons;
