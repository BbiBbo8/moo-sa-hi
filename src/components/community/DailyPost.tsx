import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { DailyPostType } from "@/types/communityPost";
import { getImageSrc } from "@/utils/getImageSrc";
import { formatTime } from "@/utils/formatTime";
import PATH from "@/constants/PATH";

type PostCardProps = {
  post: DailyPostType;
};

const DailyPost = ({ post }: PostCardProps) => {
  const imgSrc = getImageSrc(post.img_url || undefined);

  // NOTE: 날짜 작성 형태(년도.월.일)를 형식에 맞춰 반환
  const timeCreated = formatTime({ time: post.created_at });

  return (
    <Link href={`${PATH.COMMUNITYDAILY}/${post.id}`} className="h-full w-full">
      <Card className="w-full rounded-none border-0 border-b border-gray-50 py-5 shadow-none">
        <CardContent className="right-0 bottom-4 left-0 flex flex-row items-center justify-between gap-5 p-0 px-5">
          <div className="relative h-[80px] flex-1">
            <CardHeader className="p-0 text-[12px] text-gray-500">
              <section className="flex flex-row items-center gap-2">
                <span>{post.user?.nickname}</span>
              </section>
            </CardHeader>

            <CardTitle className="mb-2 truncate text-lg">
              {post.title}
            </CardTitle>
            <p className="truncate text-[12px] text-gray-500">
              {timeCreated} · 댓글 {post.comments?.length || 0}
            </p>
          </div>

          {/* NOTE: 이미지 썸네일 */}
          <div className="flex h-[80px] w-[80px] items-center overflow-hidden rounded-md">
            {imgSrc && (
              <Image
                src={imgSrc}
                alt="게시글 이미지"
                width={330}
                height={350}
                className="h-[100px] w-[100px] object-cover"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DailyPost;
