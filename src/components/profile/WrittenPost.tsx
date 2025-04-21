"use client";

import PATH from "@/constants/PATH";
import useGetPosts from "@/hooks/useGetPosts";
import Image from "next/image";
import Link from "next/link";

const WrittenPost = () => {
  const { data: posts } = useGetPosts();
  const shelterPost = posts?.shelter_post;
  const dailyPost = posts?.daily_post;

  // 이미지 존재 여부 판단하는 함수
  const isImage = (postUrl: string | null) => {
    if (postUrl === "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <section className="grid grid-cols-3 gap-0.5 text-center">
        {/* 대피소 먼저 렌더링 */}
        {shelterPost &&
          shelterPost?.map(post => (
            <div
              key={post.id}
              className="bg-accent grid aspect-square min-h-32 min-w-32 truncate overflow-hidden bg-center"
            >
              <Link href={`${PATH.COMMUNITYSHELTER}/${post.id}`}>
                <div className="min-h-32 min-w-32">
                  {/* 이미지가 존재할 때 썸네일 띄우기 */}
                  {isImage(post.img_url) ? (
                    <Image
                      src={post.img_url as string}
                      alt="이미지"
                      width={640}
                      height={640}
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
              className="bg-accent grid aspect-square min-h-32 min-w-32 overflow-hidden bg-center"
            >
              <Link href={`${PATH.COMMUNITYDAILY}/${post.id}`}>
                <div className="min-h-32 min-w-32">
                  {isImage(post.img_url) ? (
                    <Image
                      src={post.img_url as string}
                      alt="이미지"
                      width={640}
                      height={640}
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
        <section className="text-center">
          <div>여기에 아이콘</div>
          <p>아직 작성된 게시글이 없어요</p>
        </section>
      )}
    </>
  );
};

export default WrittenPost;
