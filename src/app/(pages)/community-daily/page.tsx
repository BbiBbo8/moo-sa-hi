import Image, { StaticImageData } from "next/image";
import sampleImage1 from "../../../../public/sampleScreenshot.png";
import sampleImage2 from "../../../../public/shorty.jpeg";
import sampleImage3 from "../../../../public/ugly.jpeg";
import sampleImage4 from "../../../../public/고양이.jpeg";
import sampleImage5 from "../../../../public/우리캐릭터2 1 (1).png";
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

const CommunityDailyPage = () => {
  type DummyData = {
    id: number;
    userName: string;
    imgUrl: StaticImageData;
    numOfBeingUseful: number;
    postTitle: string;
    postContent: string;
  };

  const DUMMY_DATA: DummyData[] = [
    {
      id: 1,
      userName: "user1",
      imgUrl: sampleImage1,
      numOfBeingUseful: 3,
      postTitle: "국가는 재해를 예방",
      postContent:
        "국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다.",
    },
    {
      id: 2,
      userName: "user2",
      imgUrl: sampleImage2,
      numOfBeingUseful: 12334,
      postTitle: "더미데이터",
      postContent: "산들림 미쁘다 별하 이플 우리는 달볓 옅구름 그루잠 도담도담",
    },
    {
      id: 3,
      userName: "user3",
      imgUrl: sampleImage3,
      numOfBeingUseful: 87,
      postTitle: "로렘 입슐랭",
      postContent: "노트북 곰다시 이플 옅구름 컴퓨터 아련 책방 소록소록 여우비",
    },
  ];

  return (
    <main className="relative min-w-screen h-screen flex flex-col justify-center items-center">
      <Tabs
        defaultValue="account"
        className="w-[400px] flex flex-col justify-center items-center"
      >
        <TabsList className="absolute top-16">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <section className="absolute top-32">
          <TabsContent value="account">대피소 커뮤니티 페이지</TabsContent>
          <TabsContent value="password">
            <section className="flex flex-col justify-center gap-20">
              {DUMMY_DATA.map((data) => {
                return (
                  <Card key={data.id} className="w-[350px] p-5 pb-10 gap-3">
                    <CardHeader className="p-0">
                      {/* 작성자 아바타 이미지 & 닉네임*/}
                      <section className="flex flex-row items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{data.userName}</span>
                      </section>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Carousel className="relative border-2 border-black">
                        <CarouselContent className=" z-0">
                          <CarouselItem>
                            <Image
                              src={data.imgUrl}
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
                        <span className="text-gray-500">
                          유용해요 {data.numOfBeingUseful}개
                        </span>
                        <ThumbsUp></ThumbsUp>
                      </section>
                      <section className="flex flex-col p-0 mt-2 mb-4 gap-2">
                        <CardTitle>{data.postTitle}</CardTitle>
                        <p className="text-sm">{data.postContent}</p>
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
