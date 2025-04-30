"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDailyPosts } from "@/supabase/getCommuniy";
import DailyPost from "@/components/community/DailyPost";
import Loading from "../Loading";
import Error from "../Error";
import PostCreateFloatingBtn from "@/components/community/PostCreateFloatingBtn";
import CommunityHeader from "@/components/community/CommunityHeader";
import { useMemo, useState } from "react";
import CommunityBanner from "@/components/community/detail/banner";

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
    console.error("commuity-daily  에러", error);
    return <Error />;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[640px] min-w-[320px] flex-col items-center pt-16 pb-16">
      <div className="fixed top-0 z-50 w-full">
        <CommunityHeader setSearchTerm={setSearchTerm} />
      </div>

      <CommunityBanner />

      {/* 필터링된 게시글 반환 */}
      <section className="flex w-full max-w-[640px] flex-col items-center justify-center overflow-auto">
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

      <div className="fixed right-5 bottom-[100px]">
        <PostCreateFloatingBtn />
      </div>
    </main>
  );
};

export default CommunityDailyPage;
