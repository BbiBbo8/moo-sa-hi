"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WrittenPost from "./WrittenPost";
import CommentPost from "./CommentPost";
import BlankPost from "./BlankPost";
import Error from "@/app/(pages)/Error";
import Loading from "@/app/(pages)/Loading";
import { useUserData } from "@/hooks/useUserData";
import HelpfulPost from "./HelpfulPost";

const ProfileTabs = () => {
  const { data, isLoading, error } = useUserData();
  // 불러온 데이터 정의
  const user = data?.userMetaData;

  if (isLoading) {
    return <Loading />;
  }
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error) {
    return <Error />;
  }

  return (
    <div className="mt-18 text-center">
      <Tabs defaultValue="post" className="mt-4">
        <TabsList>
          {/* 탭 메뉴 */}
          <TabsTrigger value="post">작성 게시글</TabsTrigger>
          <TabsTrigger value="comment">댓글 단 게시글</TabsTrigger>
          <TabsTrigger value="useful">저장 된 게시글</TabsTrigger>
        </TabsList>
        {/* 트리거에 맞는 내용 */}
        <TabsContent value="post">
          {user && <WrittenPost />}
          {!user && <BlankPost />}
        </TabsContent>
        <TabsContent value="comment">
          {user && <CommentPost />}
          {!user && <BlankPost />}
        </TabsContent>
        <TabsContent value="useful">
          {user && <HelpfulPost />}
          {!user && <BlankPost />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
