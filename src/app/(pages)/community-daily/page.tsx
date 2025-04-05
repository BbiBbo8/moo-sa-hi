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
import { ThumbsUp } from "lucide-react";

const CommunityDailyPage = () => {
  const USEFULNUM = 10;

  return (
    <main className="min-w-screen h-screen flex flex-col justify-center items-center">
      <Card className="pt-3">
        <CardHeader className="w-[300px] h-[400px] p-3">
          {/* 작성자 아바타 이미지 & 닉네임*/}
          <section className="flex flex-row items-center gap-2 pb-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Avatar Name</span>
          </section>

          <CardDescription>
            <Image
              src={sampleImage}
              alt="sampleImage"
              width={300}
              height={300}
              className="w-[280px] h-[350px]"
            />

            {/* "유용해요 아이콘 & 개수" */}
            <section className="flex flex-row justify-between items-row">
              <span>유용해요 {USEFULNUM}개</span>
              <ThumbsUp></ThumbsUp>
            </section>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default CommunityDailyPage;
