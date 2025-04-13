import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Post } from "@/types/communityPost";
import { getImageSrc } from "@/utils/getImageSrc";
import { format } from "date-fns";

type PostCardProps = {
  post: Post;
};

export const DailyPost = ({ post }: PostCardProps) => {
  const imgSrc = getImageSrc(post.img_url || undefined);

  // NOTE: 날짜 작성 형태(년도.월.일)를 형식에 맞춰 반환
  const formatted = format(new Date(post.created_at), "yyyy.MM.dd");

  return (
    <Link href={`/community-daily/${post.id}`} className="h-full w-full">
      <Card className="w-full rounded-none border-0 border-b border-gray-200 p-0 py-5 shadow-none">
        <CardContent className="right-0 bottom-4 left-0 flex flex-row items-center justify-between p-0">
          <div className="h-[80px] flex-1">
            <CardHeader className="p-0 text-[12px] text-gray-500">
              <section className="flex flex-row items-center gap-2">
                <span>{post.user?.nickname}</span>
              </section>
            </CardHeader>

            <CardTitle className="mb-2 text-lg">{post.title}</CardTitle>
            <p className="text-[12px] text-gray-500">
              {formatted} · 조회수 12 · 댓글 8개
            </p>
          </div>

          {/* NOTE: 이미지 썸네일 */}
          <div className="flex h-[80px] w-[80px] items-center overflow-hidden rounded-md">
            <Image
              src={imgSrc}
              alt="sampleImage"
              width={330}
              height={350}
              className="h-[100px] w-[100px] object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
