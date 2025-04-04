import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="post" className="w-[400px]">
      <TabsList>
        {/* 탭 메뉴 */}
        <TabsTrigger value="post">작성 게시글</TabsTrigger>
        <TabsTrigger value="comment">참여 게시글</TabsTrigger>
        <TabsTrigger value="useful">저장된 게시글</TabsTrigger>
      </TabsList>
      {/* 트리거에 맞는 내용 */}
      <TabsContent value="post">여기에 작성한 게시글이 표시됩니다.</TabsContent>
      <TabsContent value="comment">
        여기에 댓글을 단 게시글이 표시됩니다.
      </TabsContent>
      <TabsContent value="useful">
        여기에 유익해요한 게시글이 표시됩니다.
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
