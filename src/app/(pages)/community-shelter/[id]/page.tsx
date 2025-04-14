import CommentList from "@/components/community/CommentList";
import CommentForm from "@/components/community/form/CommentForm";
import ShelterDetailPost from "@/components/community/ShelterDetailPost";

const shelterDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // NOTE : Promise로 받기 때문에 async/await 필요
  const numericId = Number(id);

  return (
    <main>
      <ShelterDetailPost id={numericId} />
      <CommentForm postId={numericId} />
      <CommentList postId={numericId} />
    </main>
  );
};
export default shelterDetailPage;
