"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchShelterPosts } from "@/supabase/getCommuniy";
import ShelterPost from "@/components/community/ShelterPost";
import Loading from "../Loading";
import Error from "../Error";
import PostCreateFloatingBtn from "@/components/community/PostCreateFloatingBtn";
import { useState, useMemo } from "react";
import CommunityHeader from "@/components/community/CommunityHeader";
import Image from "next/image";

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
    <main className="flex min-h-screen flex-col items-center pt-16 pb-16">
      <div className="fixed top-0 z-50 w-full">
        <CommunityHeader setSearchTerm={setSearchTerm} />
      </div>

      <div className="top-16 left-5 flex w-full flex-row items-center justify-between gap-2 bg-[#F7F7F7] px-5 py-2">
        <div className="flex flex-row items-center justify-center gap-1 text-sm text-gray-600">
          <Image
            src={"/icons/community/bullhorn-solid.svg"}
            alt={"icon"}
            width={24}
            height={24}
          />
          <span>대피소 관련 경험과 정보를 솔직하게 공유해주세요.</span>
        </div>
        <Image
          src={"/icons/community/xmark-solid.svg"}
          alt={"icon"}
          width={20}
          height={20}
        />
      </div>

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
