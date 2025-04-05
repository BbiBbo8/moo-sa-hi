import Image from "next/image";
import sampleImage from "../../../../public/sampleScreenshot.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ThumbsUp } from "lucide-react";

const CommunityDailyPage = () => {
  const USEFULNUM = 10;
  const DUMMY_TEXT =
    "지방자치단체는 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다.";

  return (
    <main className="min-w-screen h-screen flex flex-col justify-center items-center">
      <Card className="w-[350px] p-5 pb-10 gap-3">
        <CardHeader className="p-0">
          {/* 작성자 아바타 이미지 & 닉네임*/}
          <section className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Avatar Name</span>
          </section>
        </CardHeader>
        <CardContent className="p-0">
          <Carousel className="relative border-2 border-black">
            <CarouselContent className=" z-0">
              <CarouselItem>
                <Image
                  src={sampleImage}
                  alt="sampleImage"
                  width={330}
                  height={350}
                  className="w-[330px] h-[350px]"
                />
              </CarouselItem>
              <CarouselItem>
                {" "}
                <Image
                  src={sampleImage}
                  alt="sampleImage"
                  width={330}
                  height={350}
                  className="w-[330px] h-[350px]"
                />
              </CarouselItem>
              <CarouselItem>
                {" "}
                <Image
                  src={sampleImage}
                  alt="sampleImage"
                  width={330}
                  height={350}
                  className="w-[330px] h-[350px]"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>

          {/* "유용해요 아이콘 & 개수" */}
          <section className="flex flex-row justify-between items-row">
            <span className="text-gray-500">유용해요 {USEFULNUM}개</span>
            <ThumbsUp></ThumbsUp>
          </section>
          <section className="flex flex-col p-0 mt-2 mb-4 gap-2">
            <CardTitle>게시글 제목</CardTitle>
            <p className="text-sm">{DUMMY_TEXT}</p>
          </section>
          <p className="text-gray-500">댓글 컴포넌트 들어갈 공간</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default CommunityDailyPage;
