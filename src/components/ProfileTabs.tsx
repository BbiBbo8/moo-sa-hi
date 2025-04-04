import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

<Tabs defaultValue="written" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="post">작성 게시글</TabsTrigger>
    <TabsTrigger value="comment">참여 게시글</TabsTrigger>
    <TabsTrigger value="useful">저장된 게시글</TabsTrigger>
  </TabsList>
  <TabsContent value="post">여기에 작성한 게시글이 표시됩니다.</TabsContent>
  <TabsContent value="comment">
    여기에 댓글을 단 게시글이 표시됩니다.
  </TabsContent>
  <TabsContent value="useful">
    여기에 유익해요한 게시글이 표시됩니다.
  </TabsContent>
</Tabs>;
