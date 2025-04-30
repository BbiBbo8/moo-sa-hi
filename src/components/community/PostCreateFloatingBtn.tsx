import getUserData from "@/supabase/getUserData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PATH from "@/constants/PATH";
import SigninDrawer from "../auth/SigninDrawer";
import pen from "public/icons/community/pen-solid.svg";

const PostCreateFloatingBtn = () => {
  const router = useRouter();
  const userData = getUserData();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleWritingBtnClick = async () => {
    const { user } = await userData;
    if (!user) {
      setIsDrawerOpen(true);
    } else {
      router.push(PATH.CREATE);
    }
  };

  return (
    <>
      <button
        onClick={handleWritingBtnClick}
        // 고민사항 : 원래 디자인 시안대로라면 다른 drop-shadow가 들어가지만 왜인지 디자인 변수가 적용이 안되서 해당 파일 수정 후 다시 시도하겠습니다!
        className="shadow-button flex h-[64px] w-[64px] items-center justify-center gap-1 rounded-full bg-white text-sm"
      >
        <div className="relative h-8 w-8">
          <Image src={pen} alt={"icon"} fill className="object-cover" />
        </div>
      </button>
      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />{" "}
    </>
  );
};

export default PostCreateFloatingBtn;
