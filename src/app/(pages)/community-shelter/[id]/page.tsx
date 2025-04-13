import ShelterPostDetail from "@/components/community/ShelterPostDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // NOTE : Promise로 받기 때문에 async/await 필요
  const numericId = Number(id);

  return (
    <main>
      <ShelterPostDetail id={numericId} />
    </main>
  );
}
