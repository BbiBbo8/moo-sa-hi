import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchPosts } from "@/supabase/getCommuniy";

type Post = Awaited<ReturnType<typeof fetchPosts>>[number];
type PostCardProps = {
  post: Post;
};
type Helpful = Post["helpfuls"][number];

export const PostCard = ({ post }: PostCardProps) => {
  const imgSrc =
    typeof post.img_url === "string" && post.img_url.startsWith("http")
      ? post.img_url
      : "/kakao_logo.png";
  return (
    <Card key={post.id} className="w-[330px] gap-3 p-5 pb-10">
      <CardHeader className="p-0">
        {/* 작성자 아바타 이미지 & 닉네임*/}
        <section className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={post.user?.profile_image || ""} />{" "}
            {/* 유저 프로필사진을 불러온 후 뒤에 .src를 명시적으로 뒤에 붙여 Next.js의 Image 최적화 시스템이 사용하는 경로 문자열을 정확히 가져올 수 있음*/}
            <AvatarFallback>{post.user?.nickname?.[0] || "?"}</AvatarFallback>
          </Avatar>
          <span>{post.user?.nickname}</span>
        </section>
      </CardHeader>
      <CardContent className="p-0">
        <Carousel className="relative border-2 border-black">
          <CarouselContent className="z-0">
            <CarouselItem>
              <Image
                src={imgSrc}
                alt="sampleImage"
                width={330}
                height={350}
                className="h-[350px] w-[330px]"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2" />
        </Carousel>

        {/* "유용해요 아이콘 & 개수" */}
        <section className="items-row mt-2 flex flex-row justify-between">
          <span className="text-gray-500">
            {/* 유용해요 {post.}개 */}
            유용해요{" "}
            {post.helpfuls?.filter((h: Helpful) => h.daily_post_id === post.id)
              .length ?? 0}
            개{" "}
          </span>
          <ThumbsUp></ThumbsUp>
        </section>
        <section className="mt-2 mb-4 flex flex-col gap-2 p-0">
          <CardTitle>{post.title}</CardTitle>
          <p className="text-sm">{post.contents}</p>
        </section>
        <p className="text-gray-500">댓글 컴포넌트 들어갈 공간</p>
      </CardContent>
    </Card>
  );
};
