import CommentForm from "@/components/community/form/CommentForm";

const ShelterDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // NOTE : Promise로 받기 때문에 async/await 필요
  const numericId = Number(id);

  return (
    <div>
      <div>아이디 값: {id}</div>
      <CommentForm />
    </div>
  );
};
