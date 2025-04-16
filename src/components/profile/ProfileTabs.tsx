import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WrittenPost from "./WrittenPost";
import CommentPost from "./CommentPost";
import UsefulPost from "./UsefulPost";

const ProfileTabs = () => {
  return (
    <div className="text-center">
      <Tabs defaultValue="post" className="mt-4">
        <TabsList>
          {/* 탭 메뉴 */}
          <TabsTrigger value="post">작성 게시글</TabsTrigger>
          <TabsTrigger value="comment">댓글 단 게시글</TabsTrigger>
          <TabsTrigger value="useful">저장된 게시글</TabsTrigger>
        </TabsList>
        {/* 트리거에 맞는 내용 */}
        <TabsContent value="post">
          <WrittenPost />
        </TabsContent>
        <TabsContent value="comment">
          <CommentPost />
        </TabsContent>
        <TabsContent value="useful">
          <UsefulPost />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
