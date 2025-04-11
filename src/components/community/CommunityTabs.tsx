// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DailyPost } from "@/components/community/DailyPost";
// import { fetchDailyPosts } from "@/supabase/getCommuniy";
// import { fetchShelterPosts } from "@/supabase/getCommuniy";
// import { ShelterPost } from "./ShelterPost";

// type Post = Awaited<ReturnType<typeof fetchDailyPosts>>[number];
// type CommunityTabsProps = {
//   posts: Post[];
// };

// export const CommunityTabs = ({ posts }: CommunityTabsProps) => {
//   return (
//     <Tabs
//       defaultValue="shelter"
//       className="flex w-[400px] flex-col items-center justify-center"
//     >
//       <TabsList className="absolute top-16 rounded-full [&>*]:rounded-full">
//         <TabsTrigger value="shelter">대피소</TabsTrigger>
//         <TabsTrigger value="daily">일상</TabsTrigger>
//       </TabsList>

//       <section className="absolute top-32 m-4">
//         <TabsContent value="shelter">
//           <section className="grid grid-cols-2 gap-5">
//             {posts?.map(post => {
//               console.log(post.helpfuls);
//               return <ShelterPost key={post.id} post={post} />;
//             })}
//           </section>
//         </TabsContent>
//         <TabsContent value="daily">
//           <section className="flex flex-col justify-center gap-10">
//             {posts?.map(post => {
//               console.log(post.helpfuls);
//               return <DailyPost key={post.id} post={post} />;
//             })}
//           </section>
//         </TabsContent>
//       </section>
//     </Tabs>
//   );
// };

// export default Tabs;
