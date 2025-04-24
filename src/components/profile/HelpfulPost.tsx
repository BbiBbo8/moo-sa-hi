"use client";

import Error from "@/app/(pages)/Error";
import Loading from "@/app/(pages)/Loading";
import PATH from "@/constants/PATH";
import { useGetHelpfuls } from "@/hooks/profile/useGetHelpfuls";
import Image from "next/image";
import Link from "next/link";

const HelpfulPost = () => {
  const { data: helpfuls, error, isLoading } = useGetHelpfuls();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  // 이미지 존재 여부 판단하는 함수
  const isImage = (postUrl: string | null) => {
    if (postUrl === "" || postUrl === null) {
      return false;
    } else {
      return true;
    }
  };

  return (
    // 프레임만 존재
    <section className="grid grid-cols-3 gap-0.5 text-center">
      {helpfuls?.map(helpful => (
        <div
          key={helpful.id}
          className="bg-accent relative grid aspect-square min-h-32 min-w-32 truncate overflow-hidden bg-center"
        >
          {/* 대피소 커뮤니티일 때 */}
          {helpful.daily_post === null && (
            <Link href={`${PATH.COMMUNITYSHELTER}/${helpful.shelter_post?.id}`}>
              <div className="min-h-32 min-w-32">
                {/* 이미지가 존재할 때 썸네일 띄우기 */}
                {isImage(helpful?.shelter_post?.img_url!) ? (
                  <Image
                    src={helpful.shelter_post?.img_url as string}
                    alt="이미지"
                    fill
                    objectFit="cover"
                  />
                ) : (
                  <p className="mt-[42%]">{helpful.shelter_post?.title}</p>
                )}
              </div>
            </Link>
          )}
          {/* 일상 커뮤니티일 때 */}
          {helpful.shelter_post === null && (
            <Link href={`${PATH.COMMUNITYDAILY}/${helpful.daily_post?.id}`}>
              <div className="min-h-32 min-w-32">
                {/* 이미지가 존재할 때 썸네일 띄우기 */}
                {isImage(helpful?.daily_post?.img_url!) ? (
                  <Image
                    src={helpful.daily_post?.img_url as string}
                    alt="이미지"
                    fill
                    objectFit="cover"
                  />
                ) : (
                  <p className="mt-[42%]">{helpful.daily_post?.title}</p>
                )}
              </div>
            </Link>
          )}
        </div>
      ))}
    </section>
  );
};

export default HelpfulPost;
