"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/supabase/getCommuniy";
import { CommunityTabs } from "@/components/community/CommunityTabs";

const CommunityDailyPage = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <main className="relative flex h-screen min-w-screen flex-col items-center justify-center">
      <CommunityTabs posts={posts!} />{" "}
      {/* 상의 필요: 페이지에 포스트가 없을 경우를 대비해 <CommunityTabs posts={posts ?? []} />라고 작성할지 고민 중 */}
    </main>
  );
};

export default CommunityDailyPage;
