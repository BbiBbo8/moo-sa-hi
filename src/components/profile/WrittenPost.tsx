"use client";

import PATH from "@/constants/PATH";
import useGetPosts from "@/hooks/useGetPosts";
import Image from "next/image";
import Link from "next/link";

const WrittenPost = () => {
  const { data: posts } = useGetPosts();
  const shelterPost = posts?.shelter_post;
  const dailyPost = posts?.daily_post;

  const isImage = (postUrl: string | null) => {
    if (postUrl === null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <section className="grid grid-cols-3 gap-2 text-center">
        {/* 대피소 먼저 렌더링 */}
        {shelterPost &&
          shelterPost?.map(post => (
            <Link href={PATH.COMMUNITYSHELTER + `/${post.id}`}>
              <div
                key={post.id}
                className="bg-accent h-30 w-30 overflow-hidden bg-center"
              >
                {/* 이미지가 있으면 bg를 이미지로 변경 */}
                {isImage(post.img_url) ? (
                  <Image
                    src={post.img_url}
                    width={30}
                    height={30}
                    alt={post.title}
                    className="h-30 w-30 object-cover"
                  />
                ) : null}
                {!isImage(post.img_url) && (
                  <>
                    <p>{post.title}</p>
                    <p>대피소</p>
                  </>
                )}
              </div>
            </Link>
          ))}
        {/* 일상 렌더링 */}
        {dailyPost &&
          dailyPost?.map(post => (
            <Link href={PATH.COMMUNITYDAILY + `/${post.id}`}>
              <div
                key={post.id}
                className="bg-accent h-30 w-30 overflow-hidden bg-center"
              >
                {/* 이미지가 있으면 bg를 이미지로 변경 */}
                {isImage(post.img_url) ? (
                  <Image
                    src={post.img_url}
                    width={30}
                    height={30}
                    alt={post.title}
                    className="h-30 w-30 object-cover"
                  />
                ) : null}
                {!isImage(post.img_url) && (
                  <>
                    <p>{post.title}</p>
                    <p>일상</p>
                  </>
                )}
              </div>
            </Link>
          ))}
      </section>
      {/* 작성 게시글이 없으면 보이기 */}
      {(!shelterPost || !dailyPost) && (
        <div>
          <p>지금 바로 게시글을 작성해보세요!</p>
        </div>
      )}
    </>
  );
};

export default WrittenPost;
