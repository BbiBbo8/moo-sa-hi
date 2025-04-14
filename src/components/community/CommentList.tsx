"use client";

import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/useUserData";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { useComments } from "@/hooks/useComments";
import useDeleteComment from "@/hooks/useDeleteComment";

const CommentList = ({ postId }: { postId: number }) => {
  const { data, error, isLoading } = useUserData();
  const user = data?.user;

  const {
    data: comments,
    error: commentError,
    isLoading: isCommentLoading,
  } = useComments({ postId });

  //   댓글 작성자 여부 확인
  const isOwned = (commentUserId: string | null) => {
    if (user?.id === commentUserId) {
      return true;
    } else {
      return false;
    }
  };

  //   댓글 삭제 함수 호출
  const deleteCommentMutation = useDeleteComment();
  // 로딩 중일 때 로딩중 컴포넌트 표시
  if (isLoading || isCommentLoading) {
    return <Loading />;
  }
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error || commentError) {
    return <Error />;
  }

  return (
    <section className="m-4 mb-12 flex flex-col gap-4">
      {comments?.map(comment => (
        <Card key={comment.id}>
          <CardContent>
            <CardDescription>{comment.comments}</CardDescription>
          </CardContent>
          {isOwned(comment.user_id) && (
            <Button onClick={() => deleteCommentMutation.mutate(comment.id)}>
              삭제
            </Button>
          )}
        </Card>
      ))}
    </section>
  );
};

export default CommentList;
