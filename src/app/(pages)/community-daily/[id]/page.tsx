import DailyDetailPost from "@/components/community/DailyDetailPost";

const DailyDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  console.log(id);
  return (
    <main>
      <DailyDetailPost id={2} />
    </main>
  );
};

export default DailyDetailPage;
