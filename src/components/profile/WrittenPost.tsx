"use client";

import PATH from "@/constants/PATH";
import useGetPosts from "@/hooks/useGetPosts";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";

const WrittenPost = () => {
  const { data: posts } = useGetPosts();
  console.log(posts);
  const shelterPost = posts?.shelter_post;
  const dailyPost = posts?.daily_post;

  return (
    <>
      <section className="grid grid-cols-3 gap-2 text-center">
        {/* 대피소 먼저 렌더링 */}
        {shelterPost &&
          shelterPost?.map(post => (
            <Link href={PATH.COMMUNITYSHELTER + `/${post.id}`}>
              <div key={post.id} className="bg-accent h-30 w-30">
                <p>{post.title}</p>
                <p>대피소</p>
              </div>
            </Link>
          ))}
        {/* 일상 렌더링 */}
        {dailyPost &&
          dailyPost?.map(post => (
            <Link href={PATH.COMMUNITYDAILY + `/${post.id}`}>
              <div key={post.id} className="bg-accent h-30 w-30">
                <p>{post.title}</p>
                <p>일상</p>
              </div>
            </Link>
          ))}
      </section>{" "}
      {(!shelterPost || !dailyPost) && (
        <div>
          <p>지금 바로 게시글을 작성해보세요!</p>
        </div>
      )}
    </>
  );
};

export default WrittenPost;
