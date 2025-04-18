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
    <main className="flex min-h-screen min-w-screen flex-col items-center px-5 pt-16">
      <CommunityHeader setSearchTerm={setSearchTerm} />

      <div className="top-16 left-5 flex h-12 w-full items-center gap-2 bg-white text-sm text-gray-600">
        <Image
          src={"/icons/bullhorn-solid 1.svg"}
          alt={"icon"}
          width={24}
          height={24}
        />
        대피소 관련 경험과 정보를 솔직하게 공유해주세요.
      </div>

      {/* 필터링된 게시글 반환 */}
      <section className="top-30 flex max-w-screen flex-col gap-4 overflow-auto p-5">
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
