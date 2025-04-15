"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDailyPosts } from "@/supabase/getCommuniy";
import DailyPost from "@/components/community/DailyPost";
import Link from "next/link";
import { Search } from "lucide-react";
import PATH from "@/constants/PATH";
import Loading from "../Loading";
import Error from "../Error";
import PostCreateFloatingBtn from "@/components/community/PostCreateFloatingBtn";

const CommunityDailyPage = () => {
  const {
    data: dailyPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dailyPosts"],
    queryFn: fetchDailyPosts,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <main className="relative flex h-screen min-w-screen flex-col items-center justify-center p-4">
      {/* 검색창, 로고 ==> fixed로 하기 & 안내문은 할 필요 x */}
      <section className="absolute top-3 left-5 flex flex-row items-center gap-4">
        <Link href={PATH.COMMUNITYSHELTER}>대피소</Link>
        <Link href={PATH.COMMUNITYDAILY}>일상</Link>
        {/* 고민 사항 : 이미 만들어진 검색창 컴포넌트 사용할까 고민 중. 그런데 디테일이나 모달창이 나오는 부분등에서 차이가 꽤 많아서 따로 컴포넌트를 만들어야하나 고민됨.*/}
        {/* <div className="[&>*]:w-60">
          <InputSearch />
        </div> */}
        <div className="relative h-10 w-64 rounded-md bg-gray-100">
          <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
            키워드 검색
          </span>
        </div>
      </section>

      <div className="absolute top-16 flex h-12 w-full items-center justify-center gap-2 bg-white">
        {/* 아이콘 대용 네모 */}
        <div className="h-5 w-5 bg-gray-200"></div>
        대피소 관련 경험과 정보를 솔직하게 공유해주세요.
      </div>

      <section className="absolute top-30 flex w-full flex-col items-center justify-center px-4">
        {dailyPosts?.map(post => {
          return <DailyPost key={post.id} post={post} />;
        })}
      </section>

      <div className="fixed right-4 bottom-[100px]">
        <PostCreateFloatingBtn />
      </div>
    </main>
  );
};

export default CommunityDailyPage;
