"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchShelterPosts } from "@/supabase/getCommuniy";
import Link from "next/link";
import { ShelterPost } from "@/components/community/ShelterPost";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const CommunityShelterPage = () => {
  const pathname = usePathname();

  const {
    data: shelterPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shelterPosts"],
    queryFn: fetchShelterPosts,
  });

  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <main className="flex h-screen min-w-screen flex-col items-center p-4">
      {/* 커뮤니티 이동 탭 */}
      <section className="top-3 left-5 mb-10 flex flex-row items-center gap-4">
        <Link href="/community-shelter">대피소</Link>
        <Link href="/community-daily">일상</Link>
        {/* 고민 사항 : 이미 만들어진 검색창 컴포넌트 사용할까 고민 중. 그런데 디테일이나 모달창이 나오는 부분등에서 차이가 꽤 많아서 따로 컴포넌트를 만들어야하나 고민됨.*/}
        {/* <div className="[&>*]:w-60">
          <InputSearch />
        </div> */}
        <div className="relative h-10 w-60 rounded-md bg-gray-100">
          <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
            키워드 검색
          </span>
        </div>
      </section>

      <section>
        <span className="mb-20 flex h-20 w-80 items-center justify-center bg-gray-200">
          배너 등이 들어갈 공간
        </span>
      </section>

      <section className="grid w-full grid-cols-2 justify-center gap-3">
        {shelterPosts?.map(post => {
          return <ShelterPost key={post.id} post={post} />;
        })}
      </section>
    </main>
  );
};

export default CommunityShelterPage;
