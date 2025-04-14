import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
              {/* NOTE : 아바타 이미지 안 들어감 ==> 개발하며 지우기" */}
              <section className="flex flex-row items-center gap-2">
                {/* <Avatar className="h-5 w-5">
                  <AvatarImage src={post.user?.profile_image || ""} />{" "}
                  {/* NOTE : 유저 프로필사진을 불러온 후 뒤에 .src를 명시적으로 뒤에 붙여 Next.js의 Image 최적화 시스템이 사용하는 경로 문자열을 정확히 가져올 수 있음*/
                /*}
                  <AvatarFallback>
                    {post.user?.nickname?.[0] || "?"}
                  </AvatarFallback>
                </Avatar> */}

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
