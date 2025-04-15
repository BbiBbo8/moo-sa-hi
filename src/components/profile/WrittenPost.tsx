"use client";

import PATH from "@/constants/PATH";
import useGetPosts from "@/hooks/useGetPosts";
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
            <div
              key={post.id}
              className="bg-accent h-30 w-30 overflow-hidden bg-center"
            >
              <Link href={PATH.COMMUNITYSHELTER + `/${post.id}`}>
                <p>{post.title}</p>
                <p>대피소</p>
              </Link>
            </div>
          ))}
        {/* 일상 렌더링 */}
        {dailyPost &&
          dailyPost?.map(post => (
            <div
              key={post.id}
              className="bg-accent h-30 w-30 overflow-hidden bg-center"
            >
              <Link href={PATH.COMMUNITYDAILY + `/${post.id}`}>
                <p>{post.title}</p>
                <p>일상</p>
              </Link>
            </div>
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
