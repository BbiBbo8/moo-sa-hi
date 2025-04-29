"use client";

import Error from "@/app/(pages)/Error";
import Loading from "@/app/(pages)/Loading";
import PATH from "@/constants/PATH";
import { useGetHelpfuls } from "@/hooks/profile/useGetHelpfuls";
import Image from "next/image";
import Link from "next/link";
import Pencil from "public/icons/pen-solid.svg";

const HelpfulPost = () => {
  const { data: helpfuls, error, isLoading } = useGetHelpfuls();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  // 이미지 존재 여부 판단하는 함수 (nullish coalescing operator 사용)
  const isImage = (postUrl: string | null | undefined) => {
    return postUrl ? true : false;
  };

  return (
    <>
      <section className="grid grid-cols-3 gap-0.5 text-center">
        {helpfuls?.map(helpful => (
          <div
            key={helpful.id}
            className="relative grid aspect-square min-h-32 min-w-32 overflow-hidden bg-[#F7F7F7] bg-center"
          >
            {/* 대피소 커뮤니티일 때 */}
            {helpful.daily_post === null && helpful.shelter_post && (
              <Link
                href={`${PATH.COMMUNITYSHELTER}/${helpful.shelter_post.id}`}
              >
                <div className="min-h-32 min-w-32">
                  {/* 이미지가 존재할 때 썸네일 띄우기 */}
                  {isImage(helpful.shelter_post.img_url) ? (
                    <Image
                      src={helpful.shelter_post.img_url as string}
                      alt="이미지"
                      fill
                      objectFit="cover"
                      unoptimized
                    />
                  ) : (
                    <p className="m-3 md:mt-[42%]">
                      {helpful.shelter_post.title}
                    </p>
                  )}
                </div>
              </Link>
            )}
            {/* 일상 커뮤니티일 때 */}
            {helpful.shelter_post === null && helpful.daily_post && (
              <Link href={`${PATH.COMMUNITYDAILY}/${helpful.daily_post.id}`}>
                <div className="min-h-32 min-w-32">
                  {/* 이미지가 존재할 때 썸네일 띄우기 */}
                  {isImage(helpful.daily_post.img_url) ? (
                    <Image
                      src={helpful.daily_post.img_url as string}
                      alt="이미지"
                      fill
                      objectFit="cover"
                    />
                  ) : (
                    <p className="m-3 md:mt-[42%]">
                      {helpful.daily_post.title}
                    </p>
                  )}
                </div>
              </Link>
            )}
          </div>
        ))}
      </section>
      {/* 작성 게시글이 없으면 보이기 */}
      {helpfuls && Array.isArray(helpfuls) && helpfuls.length === 0 && (
        <section className="flex flex-col gap-3 text-center">
          <div className="mt-[20%] flex justify-center">
            <Image src={Pencil} alt="pencil" width={48} height={48} />
          </div>
          <p className="font-[16px] text-[#999999]">
            아직 참여한 게시글이 없어요
          </p>
        </section>
      )}
    </>
  );
};

export default HelpfulPost;
