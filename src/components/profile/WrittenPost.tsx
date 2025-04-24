"use client";

import Error from "@/app/(pages)/Error";
import Loading from "@/app/(pages)/Loading";
import PATH from "@/constants/PATH";
import useGetPosts from "@/hooks/profile/useGetPosts";
import Image from "next/image";
import Link from "next/link";

const WrittenPost = () => {
  const { data: posts, isLoading, error } = useGetPosts();
  const shelterPost = posts?.shelter_post;
  const dailyPost = posts?.daily_post;

  // 이미지 존재 여부 판단하는 함수
  const isImage = (postUrl: string | null) => {
    if (postUrl === "" || postUrl === null) {
      return false;
    } else {
      return true;
    }
  };

  if (isLoading) {
    <Loading />;
  }
  if (error) {
    <Error />;
  }

  return (
    <>
      <section className="grid grid-cols-3 gap-0.5 text-center">
        {/* 대피소 먼저 렌더링 */}
        {shelterPost &&
          shelterPost?.map(post => (
            <div
              key={post.id}
              className="bg-accent relative grid aspect-square min-h-32 min-w-32 truncate overflow-hidden bg-center"
            >
              <Link href={`${PATH.COMMUNITYSHELTER}/${post.id}`}>
                <div className="min-h-32 min-w-32">
                  {/* 이미지가 존재할 때 썸네일 띄우기 */}
                  {isImage(post.img_url) ? (
                    <Image
                      src={post.img_url as string}
                      alt="이미지"
                      fill
                      objectFit="cover"
                    />
                  ) : (
                    <p className="mt-[42%]">{post.title}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        {/* 일상 렌더링 */}
        {dailyPost &&
          dailyPost?.map(post => (
            <div
              key={post.id}
              className="bg-accent relative grid aspect-square min-h-32 min-w-32 overflow-hidden bg-center"
            >
              <Link href={`${PATH.COMMUNITYDAILY}/${post.id}`}>
                <div className="min-h-32 min-w-32">
                  {isImage(post.img_url) ? (
                    <Image
                      src={post.img_url as string}
                      alt="이미지"
                      fill
                      objectFit="cover"
                    />
                  ) : (
                    <p className="mt-[42%]">{post.title}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
      </section>
      {/* 작성 게시글이 없으면 보이기 */}
      {shelterPost?.length === 0 && dailyPost?.length === 0 && (
        <section className="flex flex-col gap-3 text-center">
          <div className="mt-[20%] flex justify-center">
            <Image
              src="/icons/pen-solid.svg"
              alt="pensil"
              width={48}
              height={48}
            />
          </div>
          <p className="font-[16px] text-[#999999]">
            아직 작성된 게시글이 없어요
          </p>
        </section>
      )}
    </>
  );
};

export default WrittenPost;
