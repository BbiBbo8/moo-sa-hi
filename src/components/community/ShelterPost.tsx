import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Post } from "@/types/communityPost";
import { format } from "date-fns";
import PATH from "@/constants/PATH";

// NOTE: 한 줄짜리 타입지정이라 interface가 아닌 type을 사용했습니다.
type PostCardProps = {
  post: Post;
};

export const ShelterPost = ({ post }: PostCardProps) => {
  // NOTE: 날짜 작성 형태(년도.월.일)를 형식에 맞춰 반환
  const formatted = format(new Date(post.created_at), "yyyy.MM.dd");

  return (
    <Link
      href={`${PATH.COMMUNITYSHELTER}/${post.id}`}
      className="h-full w-full"
    >
      <Card key={post.id} className="relative h-44 gap-3 px-2">
        <CardContent className="h-full p-0">
          <section className="mt-2 mb-4 flex h-full flex-col items-center gap-2">
            {/* NOTE: 현재 주석처리된 코드가 사용되어야 하지만 빈 값이라 더미 데이터 사용 */}
            {/* NOTE: 현재 주석처리된 코드가 사용되어야 하지만 빈 값이라 더미 데이터 사용 */}
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
    </Link>
  );
};
