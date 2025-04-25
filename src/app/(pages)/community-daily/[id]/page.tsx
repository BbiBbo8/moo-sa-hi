import CommentList from "@/components/community/CommentList";
import DailyDetailPost from "@/components/community/detail/DailyDetailPost";
import CommentForm from "@/components/community/form/CommentForm";

const DailyDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // NOTE : Promise로 받기 때문에 async/await 필요
  const numericId = Number(id);

  return (
    <main className="mx-auto w-full max-w-[640px]">
      <DailyDetailPost id={numericId} />
      <CommentForm postId={numericId} />
      <CommentList postId={numericId} />
    </main>
  );
};

export default DailyDetailPage;
