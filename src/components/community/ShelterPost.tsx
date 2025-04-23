import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ShelterPostType } from "@/types/communityPost";
import { formatTime } from "@/utils/formatTime";
import PATH from "@/constants/PATH";
import Image from "next/image";

// NOTE: 한 줄짜리 타입지정이라 interface가 아닌 type을 사용했습니다.
type PostCardProps = {
  post: ShelterPostType;
};

const ShelterPost = ({ post }: PostCardProps) => {
  // NOTE: 날짜 작성 형태(년도.월.일)를 형식에 맞춰 반환
  const timeCreated = formatTime({ time: post.created_at });

  // NOTE: 정해진 사람 수가 없을 경우에는 "보통"을 반환
  const populationDensity = post.people || "보통"; // 이 post.people에서 값은 제대로 반환이 되는데 타입오류가 뜨네요....튜터님꼐 여쭤보겠습니다!

  const colorForPopulation =
    populationDensity === "한산"
      ? "bg-[#58999E]"
      : populationDensity === "보통"
        ? "bg-[#0671FD]"
        : populationDensity === "만원"
          ? "bg-[#EF282A]"
          : "";

  return (
    <Link
      href={`${PATH.COMMUNITYSHELTER}/${post.id}`}
      className="h-full w-full"
    >
      <Card
        key={post.id}
        className="h-[142px] w-full gap-3 border-none bg-[#F7F7F7] p-5 shadow-none"
      >
        <CardContent className="h-full p-0">
          <section className="flex h-full w-full flex-col items-start justify-center gap-2">
            <CardTitle
              className={`flex h-7 w-10 items-center justify-center rounded-lg text-sm text-[16px] text-white ${colorForPopulation}`}
            >
              {populationDensity}
            </CardTitle>
            <article className="flex w-[321px] flex-col gap-0">
              <h2 className="truncate text-[16px] font-semibold">
                {post.title}
              </h2>
              <span className="truncate text-sm">{post.shelter_name}</span>
            </article>

            <section className="flex w-full flex-row justify-between text-sm text-[#B3B3B3]">
              <p>{timeCreated}</p>
              <div className="flex items-center gap-1">
                <Image
                  src={"/icons/thumbs-up-solid.svg"}
                  alt={"icon"}
                  width={20}
                  height={20}
                />
                <span className="text-sm">{post.helpfuls?.length ?? 0}</span>
              </div>
            </section>
          </section>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShelterPost;
