import PostCreateEdit from "@/components/community/PostCreateEdit";
import React from "react";

function PostCreatePage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">게시글 작성</h1>
      <PostCreateEdit />
    </main>
  );
}

export default PostCreatePage;
