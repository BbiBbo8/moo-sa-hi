"use client";
import Loading from "@/app/(pages)/Loading";
import PATH from "@/constants/PATH";
import { useMyComments } from "@/hooks/comment/useMyCommets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommentPost = () => {
  const { data: posts, isLoading } = useMyComments();
  if (isLoading) {
    return <Loading />;
  }
  const shelter = posts?.matchedShelterPost;
  const daily = posts?.matchedDailtyPost;

  // 이미지 존재 여부 판단하는 함수
  const isImage = (postUrl: string | null) => {
    if (postUrl === "" || postUrl === null) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <section className="grid grid-cols-3 gap-0.5 text-center">
        {/* 대피소 먼저 렌더링 */}
        {shelter?.map(post => (
          <div
            key={post.id}
            className="relative grid aspect-square min-h-32 min-w-32 truncate overflow-hidden bg-[#F7F7F7] bg-center"
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
                  <p className="m-3 md:mt-[42%]">{post.title}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
        {/* 일상 렌더링 */}
        {daily?.map(post => (
          <div
            key={post.id}
            className="bg-accent relative grid aspect-square min-h-32 min-w-32 truncate overflow-hidden bg-center"
          >
            <Link href={`${PATH.COMMUNITYDAILY}/${post.id}`}>
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
                  <p className="m-3 md:mt-[42%]">{post.title}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </section>
      {/* 작성 게시글이 없으면 보이기 */}
      {shelter?.length === 0 && daily?.length === 0 && (
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
            아직 참여한 게시글이 없어요
          </p>
        </section>
      )}
    </>
  );
};

export default CommentPost;
