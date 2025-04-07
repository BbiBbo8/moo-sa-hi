import PostCreateEdit from '@/components/post/PostCreateEdit';
import React from "react";

function PostCreatePage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>
      <PostCreateEdit />
    </main>
  );
}

export default PostCreatePage;
