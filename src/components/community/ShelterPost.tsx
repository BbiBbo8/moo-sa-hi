import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchShelterPosts } from "@/supabase/getCommuniy";

type Post = Awaited<ReturnType<typeof fetchShelterPosts>>[number];
type PostCardProps = {
  post: Post;
};

export const ShelterPost = ({ post }: PostCardProps) => {
  // 날짜 작성 형태(년도.월.일)를 형식에 맞춰 반환
  const createdAt = post.created_at;
  const date = new Date(createdAt);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formatted = `${date.getFullYear()}.${month}.${day}`;

  return (
    <Card key={post.id} className="relative h-44 gap-3 px-2">
      <CardContent className="h-full p-0">
        <section className="mt-2 mb-4 flex h-full flex-col items-center gap-2">
          {/* 현재 주석처리된 코드가 사용되어야 하지만 빈 값이라 더미 데이터 사용 */}
          {/* <CardTitle>{post.people}</CardTitle> */}
          <CardTitle className="mb-3 rounded-lg border border-black p-3">
            한산
          </CardTitle>
          <h2 className="text-lg">{post.title}</h2>
          <section className="absolute right-0 bottom-4 left-0 flex justify-between px-4 text-[12px] text-gray-500">
            <p>2km</p>
            <p>{formatted}</p>
          </section>
        </section>
      </CardContent>
    </Card>
  );
};
