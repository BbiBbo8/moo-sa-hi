"use client";

import PATH from "@/constants/PATH";
import useGetPosts from "@/hooks/useGetPosts";
import Link from "next/link";

const WrittenPost = () => {
  const { data: posts } = useGetPosts();
  const shelterPost = posts?.shelter_post;
  const dailyPost = posts?.daily_post;

  // FIXME: 이미지 여부 판단. 지금은 사용하지 않는 함수
  // const isImage = (postUrl: string | null) => {
  //   if (postUrl === null) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <>
      <section className="grid grid-cols-3 gap-0.5 text-center">
        {/* 대피소 먼저 렌더링 */}
        {shelterPost &&
          shelterPost?.map(post => (
            <div
              key={post.id}
              className="bg-accent grid min-h-32 min-w-32 truncate overflow-hidden bg-center"
            >
              <Link href={PATH.COMMUNITYSHELTER + `/${post.id}`}>
                <div className="mt-12 h-full w-full">
                  <p>{post.title}</p>
                </div>
              </Link>
            </div>
          ))}
        {/* 일상 렌더링 */}
        {dailyPost &&
          dailyPost?.map(post => (
            <div
              key={post.id}
              className="bg-accent grid min-h-32 min-w-32 truncate overflow-hidden bg-center"
            >
              <Link href={PATH.COMMUNITYDAILY + `/${post.id}`}>
                <div className="mt-12 h-full w-full">
                  <p>{post.title}</p>
                </div>
              </Link>
            </div>
          ))}
      </section>
      {/* 작성 게시글이 없으면 보이기 */}
      {(shelterPost?.length === 0 || dailyPost?.length === 0) && (
        <div>
          <p>지금 바로 게시글을 작성해보세요!</p>
        </div>
      )}
    </>
  );
};

export default WrittenPost;
