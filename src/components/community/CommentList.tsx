"use client";

import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/useUserData";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import createClient from "@/supabase/client";

const CommentList = () => {
  const { data, error, isLoading } = useUserData();
  const user = data?.user;

  // 로딩 중일 때 로딩중 컴포넌트 표시
  if (isLoading) {
    return <Loading />;
  }
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error) {
    return <Error />;
  }

  //   댓글 작성자 여부 확인
  const isOwned = () => {
    if (user?.id === comments.user_id) {
      return true;
    } else {
      return false;
    }
  };

  const supabase = createClient();

  //   댓글을 삭제하는 함수
  const handleDeleteComments = async () => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("some_column", "someValue");
  };

  return (
    <section className="flex flex-col">
      {comments.map(comment => (
        <Card key={comment.id}>
          <CardContent>
            <CardDescription>{comment.comments}</CardDescription>
          </CardContent>
          {isOwned() && <Button>삭제</Button>}
        </Card>
      ))}
    </section>
  );
};

export default CommentList;
