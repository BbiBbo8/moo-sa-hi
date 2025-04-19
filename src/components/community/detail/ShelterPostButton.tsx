import Image from "next/image";
import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";

interface params {
  shelterPostId?: number | null;
  onClickReport: () => void;
}

// NOTE: 이후 tanStackQuery로 리팩토링 필요
const ShelterPostButtons = ({
  shelterPostId = null,
  onClickReport,
}: params) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const supabase = createClient();
  const userData = getUserData();

  useEffect(() => {
    const fetchInitialHelpful = async () => {
      const { user } = await userData;

      // shelterPostId가 유효한 경우에만 데이터 fetching 시도
      if (shelterPostId) {
        if (user) {
          const { data: existingHelpful, error } = await supabase
            .from("helpfuls")
            .select("id")
            .eq("user_id", user.id)
            .eq("shelter_post_id", shelterPostId)
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
          .eq("shelter_post_id", shelterPostId);

        if (countError) {
          console.error("유용해요 개수 가져오기 오류:", countError);
        }

        if (count !== null) {
          setHelpfulCount(count);
        }
      } else {
        setHelpfulCount(0);
      }
    };

    fetchInitialHelpful();
  }, [shelterPostId, userData, supabase]);

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
        .eq("shelter_post_id", shelterPostId!);

      if (deleteError) {
        console.error("유용해요 삭제 오류:", deleteError);
      } else {
        setIsHelpful(false);
        setHelpfulCount(prevCount => prevCount - 1);
        console.log("유용해요 삭제!");
      }
    } else {
      const { error: insertError } = await supabase.from("helpfuls").insert([
        {
          user_id: user.id,
          daily_post_id: null,
          shelter_post_id: shelterPostId,
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
        <button
          type="button"
          onClick={onClickReport}
          className="absolute right-0 px-1 py-0.5 text-sm text-gray-500"
        >
          신고하기
        </button>
      </section>

      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default ShelterPostButtons;
