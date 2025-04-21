import Image from "next/image";
import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import ReportButton from "@/components/report/ReportButton";

interface params {
  dailyPostId?: number | null;
}

// NOTE: 이후 tanStackQuery로 리팩토링 필요
const DailyPostButtons = ({ dailyPostId = null }: params) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const supabase = createClient();
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

    if (isHelpful) {
      const { error: deleteError } = await supabase
        .from("helpfuls")
        .delete()
        .eq("user_id", user.id)
        .eq("daily_post_id", dailyPostId!);

      if (deleteError) {
        console.error("유용해요 삭제 오류:", deleteError);
      } else {
        setIsHelpful(false);
        setHelpfulCount(prevCount => prevCount - 1);
        console.log("유용해요 삭제!");
      }
    } else {
      console.log("데이터 추가 시 dailyPostId:", dailyPostId);
      console.log("데이터 추가 시 userId:", user.id);

      const { error: insertError } = await supabase.from("helpfuls").insert([
        {
          user_id: user.id,
          daily_post_id: dailyPostId,
          shelter_post_id: null,
        },
      ]);

      if (insertError) {
        console.error("유용해요 추가 오류:", insertError);
      } else {
        setIsHelpful(true);
        setHelpfulCount(prevCount => prevCount + 1);
        console.log("유용해요 추가");
      }
    }
  };

  return (
    <>
      <section className="relative flex w-full flex-row items-center justify-center">
        {/* 유용해요 버튼 */}
        <button
          onClick={handleHelpfulClick}
          className={`flex h-10 w-30 items-center gap-0.5 rounded-md px-4 text-sm text-gray-500 ${
            isHelpful ? "bg-blue-500 text-white" : "bg-[#F2F2F2]"
          }`}
        >
          <Image
            src={"/icons/thumbs-up-solid.svg"}
            alt=""
            width={24}
            height={24}
            className={isHelpful ? "invert" : ""}
          />
          유용해요
          <span className="text-sm text-gray-600">{helpfulCount}</span>
        </button>

        {/* 신고하기 버튼 */}
        <ReportButton postId={dailyPostId} postType="daily" />
      </section>

      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default DailyPostButtons;
