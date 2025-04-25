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
      className="h-full w-screen"
    >
      <Card
        key={post.id}
        className="h-[142px] w-full gap-3 rounded-none border-b-1 border-gray-50 px-5 py-4 shadow-none"
      >
        <CardContent className="px-0">
          <section className="flex h-full w-full flex-col items-start justify-center gap-2">
            <CardTitle
              className={`flex items-center justify-center rounded-[8px] px-2 py-1 text-sm text-[14px] font-medium text-white ${colorForPopulation}`}
            >
              {populationDensity}
            </CardTitle>
            <article className="flex w-[321px] flex-col gap-0">
              <h2 className="text-titleM truncate text-gray-800">
                {post.title}
              </h2>
              <span className="text-bodyL truncate text-gray-500">
                {post.shelter_name}
              </span>
            </article>

            <section className="text-numEng flex w-full flex-row justify-between text-gray-300">
              <p>{timeCreated}</p>
              <div className="text-numEng flex items-center gap-1 text-gray-300">
                <Image
                  src={"/icons/community/thumbs-up-gray.svg"}
                  alt={"icon"}
                  width={20}
                  height={20}
                />
                <span>{post.helpfuls?.length ?? 0}</span>
              </div>
            </section>
          </section>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShelterPost;
