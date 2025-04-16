import PATH from "@/constants/PATH";
import Image from "next/image";
import Link from "next/link";

const PostCreateFloatingBtn = () => {
  return (
    <Link href={PATH.CREATE}>
      <button className="flex h-[48px] w-[102px] items-center justify-center gap-1 rounded-full border-1 border-gray-400 bg-white text-sm text-gray-500">
        <Image
          src={"/icons/PencilSimple.svg"}
          alt={"icon"}
          width={20}
          height={20}
        />
        글 작성
      </button>
    </Link>
  );
};

export default PostCreateFloatingBtn;
