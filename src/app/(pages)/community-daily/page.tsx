"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDailyPosts } from "@/supabase/getCommuniy";
import DailyPost from "@/components/community/DailyPost";
import Loading from "../Loading";
import Error from "../Error";
import PostCreateFloatingBtn from "@/components/community/PostCreateFloatingBtn";
import CommunityHeader from "@/components/community/CommunityHeader";
import { useMemo, useState } from "react";

const CommunityDailyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: dailyPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dailyPosts"],
    queryFn: fetchDailyPosts,
  });

  // 검색어로 게시글 필터링
  const filteredPosts = useMemo(() => {
    if (!dailyPosts) return [];

    return searchTerm
      ? dailyPosts.filter(
          post =>
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            false,
        )
      : dailyPosts;
  }, [dailyPosts, searchTerm]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <main className="relative flex h-screen min-w-screen flex-col items-center justify-center p-4">
      <CommunityHeader setSearchTerm={setSearchTerm} />

      <div className="absolute top-16 flex h-12 w-full items-center justify-center gap-2 bg-white">
        {/* 아이콘 대용 네모 */}
        <div className="h-5 w-5 bg-gray-200"></div>
        대피소 관련 경험과 정보를 솔직하게 공유해주세요.
      </div>

      {/* 필터링된 게시글 반환 */}
      <section className="absolute top-30 flex w-full flex-col items-center justify-center px-4">
        {filteredPosts?.length > 0 ? (
          filteredPosts.map(post => {
            return <DailyPost key={post.id} post={post} />;
          })
        ) : (
          <div className="col-span-2 flex h-40 items-center justify-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </section>

      <div className="fixed right-4 bottom-[100px]">
        <PostCreateFloatingBtn />
      </div>
    </main>
  );
};

export default CommunityDailyPage;
