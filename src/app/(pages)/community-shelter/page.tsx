"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchShelterPosts } from "@/supabase/getCommuniy";
import ShelterPost from "@/components/community/ShelterPost";
import Loading from "../Loading";
import Error from "../Error";
import PostCreateFloatingBtn from "@/components/community/PostCreateFloatingBtn";
import { useState, useMemo } from "react";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunityBanner from "@/components/community/detail/banner";

const CommunityShelterPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: shelterPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shelterPosts"],
    queryFn: fetchShelterPosts,
  });

  // 검색어로 게시글 필터링
  const filteredPosts = useMemo(() => {
    if (!shelterPosts) return [];
    const lowerSearch = searchTerm.toLowerCase();
    return shelterPosts.filter(post => {
      const title = post.title?.toLowerCase() ?? "";
      const shelterName = post.shelter_name?.toLowerCase() ?? "";
      return title.includes(lowerSearch) || shelterName.includes(lowerSearch);
    });
  }, [shelterPosts, searchTerm]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[640px] min-w-[320px] flex-col items-center pt-16 pb-16">
      <div className="fixed top-0 z-50 w-full">
        <CommunityHeader setSearchTerm={setSearchTerm} />
      </div>

      <CommunityBanner />

      {/* 필터링된 게시글 반환 */}
      <section className="top-30 flex w-full max-w-[640px] flex-col overflow-auto">
        {filteredPosts?.length > 0 ? (
          filteredPosts.map(post => {
            return <ShelterPost key={post.id} post={post} />;
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

export default CommunityShelterPage;
