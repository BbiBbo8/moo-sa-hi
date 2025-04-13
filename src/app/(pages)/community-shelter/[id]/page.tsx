// 서버 컴포넌트니까 "use client"는 없어야 함
import ShelterPostDetail from "@/components/community/ShelterPostDetail";

const Page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  return (
    <main>
      <ShelterPostDetail id={id} /> {/* ✅ 클라이언트 컴포넌트 */}
    </main>
  );
};

export default Page;
