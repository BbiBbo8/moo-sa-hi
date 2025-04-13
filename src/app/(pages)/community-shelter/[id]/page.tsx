import CommentForm from "@/components/community/CommentForm";

const ShelterDetailPage = ({
  params,
}: {
  params: {
    id: number; // number타입 지정은 임시로 한 겁니다! 수정 가능합니다~
  };
}) => {
  return (
    <div>
      <div>아이디 값: {params.id}</div>
      <CommentForm />
    </div>
  );
};

export default ShelterDetailPage;
