"use client";

import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/useUserData";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { useComments } from "@/hooks/comment/useComments";
import { useDeleteComment } from "@/hooks/comment/useCommentMutation";
import { elapsedTime } from "@/utils/formatTime";

const CommentList = ({ postId }: { postId: number }) => {
  // 댓글 삭제 함수 호출
  const deleteCommentMutation = useDeleteComment();

  const { data, error, isLoading } = useUserData();
  const user = data?.user;

  const {
    data: commentsData,
    error: commentError,
    isLoading: isCommentLoading,
  } = useComments({ postId });

  // 최신 댓글이 위로 오도록 정렬
  const sortedComments = commentsData
    ? [...commentsData].sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      })
    : [];

  // 댓글 작성자 여부 확인
  const isOwned = (commentUserId: string | null) => {
    if (user?.id === commentUserId) {
      return true;
    } else {
      return false;
    }
  };

  // 로딩 중일 때 로딩중 컴포넌트 표시
  if (isLoading || isCommentLoading) {
    return <Loading />;
  }
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error || commentError) {
    return <Error />;
  }

  return (
    <section className="mb-12 flex flex-col">
      {sortedComments.map((comment, index) => (
        <div key={comment.id}>
          {/* 댓글이 1개 이상일 때 구분선 추가 */}
          {index > 0 && <div className="h-0.25 w-full bg-gray-50" />}
          <Card className="border-none shadow-none">
            <CardContent>
              <CardDescription className="text-sm text-gray-500">
                {comment.users?.nickname}
              </CardDescription>
              <CardDescription className="mt-0.5 text-base text-gray-900">
                {comment.comments}
              </CardDescription>
              <div className="mt-3 flex flex-row">
                <CardDescription className="py-2 text-sm text-gray-300">
                  {elapsedTime(comment.created_at)}
                </CardDescription>
                {isOwned(comment.user_id) && (
                  <Button
                    onClick={() => deleteCommentMutation.mutate(comment.id)}
                    className="border-block h-fit w-fit bg-transparent text-sm font-normal text-gray-300 hover:bg-gray-50"
                  >
                    댓글 삭제
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
};

export default CommentList;
