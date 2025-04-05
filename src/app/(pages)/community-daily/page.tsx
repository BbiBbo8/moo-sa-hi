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
  return (
    <main className="min-w-screen h-screen flex flex-col justify-center items-center">
      <Card className="pt-3">
        <CardHeader className="w-[300px] h-[400px] p-3">
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
