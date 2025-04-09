"use client";

import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import createClient from "@/supabase/client";

const CommunityDailyPage = () => {
  const fetchPosts = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("daily_post").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <main className="relative flex h-screen min-w-screen flex-col items-center justify-center">
      <Tabs
        defaultValue="account"
        className="flex w-[400px] flex-col items-center justify-center"
      >
        <TabsList className="absolute top-16 rounded-full [&>*]:rounded-full">
          <TabsTrigger value="account">대피소</TabsTrigger>
          <TabsTrigger value="password">일상</TabsTrigger>
        </TabsList>
        <section className="absolute top-32">
          <TabsContent value="account">대피소 커뮤니티 페이지</TabsContent>
          <TabsContent value="password">
            <section className="flex flex-col justify-center gap-10">
              {posts?.map(post => {
                const imgSrc =
                  typeof post.img_url === "string" &&
                  post.img_url.startsWith("http")
                    ? post.img_url
                    : "/kakao_logo.png";
                return (
                  <Card key={post.id} className="w-[330px] gap-3 p-5 pb-10">
                    <CardHeader className="p-0">
                      {/* 작성자 아바타 이미지 & 닉네임*/}
                      <section className="flex flex-row items-center gap-2">
                        <Avatar>
                          <AvatarImage src={""} />{" "}
                          {/* 유저 프로필사진을 불러온 후 뒤에 .src를 명시적으로 뒤에 붙여 Next.js의 Image 최적화 시스템이 사용하는 경로 문자열을 정확히 가져올 수 있음*/}
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{post.user_id}</span>
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
                          유용해요 ㅇㅇㅇ개
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
              })}
            </section>
          </TabsContent>
        </section>
      </Tabs>
    </main>
  );
};

export default CommunityDailyPage;
