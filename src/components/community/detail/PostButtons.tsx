const PostButtons = ({ onClickReport }: { onClickReport: () => void }) => (
  <>
    <button className="flex h-[40px] w-[120px] items-center justify-center rounded-sm bg-gray-200 text-sm">
      유용해요
    </button>
    <button
      type="button"
      onClick={onClickReport}
      className="items-end justify-end bg-blue-200 px-2 py-1 text-[12px]"
    >
      신고하기
    </button>
  </>
);

export default PostButtons;
