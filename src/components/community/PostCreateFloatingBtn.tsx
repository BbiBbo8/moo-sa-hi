import getUserData from "@/supabase/getUserData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PATH from "@/constants/PATH";
import SigninDrawer from "../auth/SigninDrawer";

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
        className="flex h-[48px] w-[102px] items-center justify-center gap-1 rounded-full border-1 border-gray-400 bg-white text-sm text-gray-500"
      >
        <Image
          src={"/icons/PencilSimple.svg"}
          alt={"icon"}
          width={20}
          height={20}
        />
        글 작성
      </button>
      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />{" "}
    </>
  );
};

export default PostCreateFloatingBtn;
