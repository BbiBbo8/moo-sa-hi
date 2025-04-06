import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>닉네임</CardTitle>
        {/* 이외 추가 설명이 있다면 들어갈 곳 */}
        <CardDescription>추가 설명</CardDescription>
        {/* 아바타 들어갈 곳 */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <p>작성 게시글 수</p>
        <p>참여 게시글 수</p>
        <p>저장 게시글 수</p>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
