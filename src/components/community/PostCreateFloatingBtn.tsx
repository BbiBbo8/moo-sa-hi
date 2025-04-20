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
        className="shadow-buttonShadow flex h-[64px] w-[64px] items-center justify-center gap-1 rounded-full bg-white text-sm"
      >
        <div className="relative h-8 w-8">
          <Image
            src={"/icons/community/pen-solid.svg"}
            alt={"icon"}
            fill
            className="object-cover"
          />
        </div>
      </button>
      {/* 로그인 드로어 */}
      <SigninDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />{" "}
    </>
  );
};

export default PostCreateFloatingBtn;
