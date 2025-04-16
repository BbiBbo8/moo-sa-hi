import Image from "next/image";

interface params {
  numOfHelpfuls: number;
  onClickReport: () => void;
}

const PostButtons = ({ numOfHelpfuls, onClickReport }: params) => {
  return (
    <section className="relative flex w-full flex-row items-center justify-center">
      {/* 유용해요 버튼 - 가운데 정렬 */}
      <button className="flex h-10 w-30 items-center gap-0.5 rounded-md bg-gray-50 px-4 text-sm text-gray-500">
        <Image
          src={"/icons/thumbs-up-solid.svg"}
          alt=""
          width={24}
          height={24}
        />
        유용해요
        <span className="text-sm text-gray-600">
          {numOfHelpfuls ? numOfHelpfuls : 0}
        </span>
      </button>

      {/* 신고하기 버튼 - 우측 절대 위치 */}
      <button
        type="button"
        onClick={onClickReport}
        className="absolute right-0 px-1 py-0.5 text-sm text-gray-500"
      >
        신고하기
      </button>
    </section>
  );
};

export default PostButtons;
