import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/community/PostCard";
import { fetchPosts } from "@/supabase/getCommuniy";

type Post = Awaited<ReturnType<typeof fetchPosts>>[number];
type CommunityTabsProps = {
  posts: Post[];
};

export const CommunityTabs = ({ posts }: CommunityTabsProps) => {
  return (
    <Tabs
      defaultValue="account"
      className="flex w-[400px] flex-col items-center justify-center"
    >
      <TabsList className="absolute top-16 rounded-full [&>*]:rounded-full">
        <TabsTrigger value="account">대피소</TabsTrigger>
        <TabsTrigger value="password">일상</TabsTrigger>
      </TabsList>

      <section className="absolute top-32">
        <TabsContent value="account">대피소 커뮤니티 페이지</TabsContent>
        <TabsContent value="password">
          <section className="flex flex-col justify-center gap-10">
            {posts?.map(post => {
              console.log(post.helpfuls);
              return <PostCard key={post.id} post={post} />;
            })}
          </section>
        </TabsContent>
      </section>
    </Tabs>
  );
};

export default Tabs;
