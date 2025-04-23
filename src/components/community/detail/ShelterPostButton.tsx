import Image from "next/image";
import { useState, useEffect } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import SigninDrawer from "@/components/auth/SigninDrawer";
import ReportButton from "@/components/report/ReportButton";
import { toast } from "sonner";

interface params {
  shelterPostId?: number | null;
}

// TODO: 이후 tanStackQuery로 리팩토링 필요
const ShelterPostButtons = ({ shelterPostId = null }: params) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const supabase = createClient();
  // NOTE: getUserData는 Promise를 반환하는 함수이므로 비동기 처리가 필요함
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
            // 에러 처리 필요 (토스트 메시지 등)
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
          // 에러 처리 필요 (토스트 메시지 등)
        }

        if (count !== null) {
          setHelpfulCount(count);
        }
      } else {
        // shelterPostId가 null인 경우 상태 초기화
        setIsHelpful(false);
        setHelpfulCount(0);
      }
    };

    fetchInitialHelpful();

    // 의존성 배열: shelterPostId가 변경될 때마다 useEffect 실행
    // userData와 supabase는 외부에서 생성되어 안정적인 참조라고 가정
    // getUserData가 Promise를 직접 반환하므로 의존성 배열에 포함 시 경고 발생 가능
    // useCallback 등으로 감싸거나 상위 컴포넌트에서 사용자 정보를 미리 가져오는 것이 더 나을 수 있음
  }, [shelterPostId, userData, supabase]);

  const handleHelpfulClick = async () => {
    const { user } = await userData; // 사용자 정보 가져오기
    if (!user) {
      setIsDrawerOpen(true);
      return;
    }

    // shelterPostId가 null인 경우 처리
    if (shelterPostId === null) {
      console.error("유용해요 액션 불가: shelterPostId가 null입니다.");
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
          .eq("shelter_post_id", shelterPostId);

        if (deleteError) {
          console.error("유용해요 삭제 오류:", deleteError);
          toast.error("유용해요 취소 실패");
          setIsHelpful(previousIsHelpful);
          setHelpfulCount(previousHelpfulCount);
        } else {
          toast.success("유용해요 취소");
        }
<<<<<<< HEAD
      } else {
        // 유용해요 등록
=======

>>>>>>> dev
        const { error: insertError } = await supabase
          .from("helpfuls")
          .insert([
            {
              user_id: user.id,
<<<<<<< HEAD
              daily_post_id: null,
              shelter_post_id: shelterPostId,
            },
          ])
          .select();
=======
              daily_post_id: null, // daily_post_id 명시적으로 null 설정
              shelter_post_id: shelterPostId,
            },
          ])
          .select(); // 필요하다면 삽입된 데이터 반환
>>>>>>> dev

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
<<<<<<< HEAD
          {/* shelterPostId가 유효할 때만 개수 표시 */}
          {isHelpful ? (
            <button
              onClick={handleHelpfulClick}
              className="border-primary text-primary flex h-10 items-center gap-0.5 rounded-md border-1 px-4 text-sm"
              // shelterPostId가 null이거나 초기 데이터 로딩 중에는 버튼 비활성화
              disabled={shelterPostId === null}
            >
              <Image
                src={"/icons/community/thumbs-up-blue.svg"}
                alt=""
                width={24}
                height={24}
              />
              유용해요
              <span className="ml-1">{helpfulCount}</span>
            </button>
          ) : (
            <button
              onClick={handleHelpfulClick}
              className="flex h-10 items-center gap-0.5 rounded-md border-1 border-gray-200 px-4 text-sm text-gray-300"
              // shelterPostId가 null이거나 초기 데이터 로딩 중에는 버튼 비활성화
              disabled={shelterPostId === null}
            >
              <Image
                src={"/icons/community/thumbs-up-gray.svg"}
                alt=""
                width={24}
                height={24}
              />
              유용해요
              <span className="ml-1">{helpfulCount}</span>
            </button>
          )}
=======
          <button
            onClick={handleHelpfulClick}
            className={`flex h-10 items-center gap-0.5 rounded-md px-4 text-sm ${
              isHelpful
                ? "bg-blue-500 text-white"
                : "bg-[#F2F2F2] text-gray-500" // 텍스트 색상 일관성 유지
            }`}
            // shelterPostId가 null이거나 초기 데이터 로딩 중에는 버튼 비활성화
            disabled={shelterPostId === null}
          >
            <Image
              src={"/icons/thumbs-up-solid.svg"}
              alt="유용해요 아이콘" // 대체 텍스트 추가
              width={24}
              height={24}
              className={isHelpful ? "invert" : ""}
            />
            유용해요
            {/* shelterPostId가 유효할 때만 개수 표시 */}
            {shelterPostId !== null && (
              <span
                className={`text-sm ${
                  isHelpful ? "text-white" : "text-gray-600"
                }`}
              >
                {helpfulCount}
              </span>
            )}
          </button>
>>>>>>> dev
        </div>

        {/* 신고하기 버튼 */}
        <div className="absolute right-0">
          <ReportButton
            postId={shelterPostId}
            key={`report-${shelterPostId}`} // 필요하다면 더 구체적인 키 사용
            postType="shelter" // "daily"에서 "shelter"로 수정 - 정확한 타입 확인 필요
          />
        </div>
      </section>

      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default ShelterPostButtons;
