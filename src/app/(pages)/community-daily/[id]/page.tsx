import DailyDetailPost from "@/components/community/DailyDetailPost";

const DailyDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  return (
    <main>
      <DailyDetailPost id={id} />
    </main>
  );
};

export default DailyDetailPage;
