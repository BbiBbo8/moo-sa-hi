"use client";

import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/useUserData";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import createClient from "@/supabase/client";
import { useComments } from "@/hooks/useComments";

const CommentList = ({ postId }: { postId: number }) => {
  const { data, error, isLoading } = useUserData();
  const user = data?.user;

  const {
    data: comments,
    error: commentError,
    isLoading: isCommentLoading,
  } = useComments({ postId });

  // 로딩 중일 때 로딩중 컴포넌트 표시
  if (isLoading || isCommentLoading) {
    return <Loading />;
  }
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error || commentError) {
    return <Error />;
  }

  //   댓글 작성자 여부 확인
  const isOwned = (commentUserId: string | null) => {
    if (user?.id === commentUserId) {
      return true;
    } else {
      return false;
    }
  };

  const supabase = createClient();
  const commentId = 1; /* 임시작성 */
  //   댓글을 삭제하는 함수
  const handleDeleteComments = async (id: number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
  };

  return (
    <section className="flex flex-col">
      {comments?.map(comment => (
        <Card key={comment.id}>
          <CardContent>
            <CardDescription>{comment.comments}</CardDescription>
          </CardContent>
          {isOwned(comment.user_id) && (
            <Button onClick={() => handleDeleteComments(comment.id)}>
              삭제
            </Button>
          )}
        </Card>
      ))}
    </section>
  );
};

export default CommentList;
