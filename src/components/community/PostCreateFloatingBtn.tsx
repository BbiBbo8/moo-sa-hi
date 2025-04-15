import PATH from "@/constants/PATH";
import Link from "next/link";

const PostCreateFloatingBtn = () => {
  return (
    <Link href={PATH.CREATE}>
      <button className="flex h-[48px] w-[102px] items-center justify-center rounded-full border-1 border-gray-400 bg-white text-sm text-gray-500">
        글 작성
      </button>
    </Link>
  );
};

export default PostCreateFloatingBtn;
