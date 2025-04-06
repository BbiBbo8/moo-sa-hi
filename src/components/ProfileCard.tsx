import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function ProfileCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border py-4 shadow-sm">
      <div className="gap-2">
        <h3 className="text-lg font-bold">닉네임</h3>
        {/* 이외 추가 설명이 있다면 들어갈 곳 */}
        <span className="text-xs font-light">추가 설명</span>
      </div>
      {/* 아바타 들어갈 곳 */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>아바타</AvatarFallback>
      </Avatar>
      {/* 해당 기능은 도전 기능입니다 뼈대만 존재 */}
      <div className="flex flex-row justify-evenly">
        <div>
          <h5 className="text-xs font-extrabold">작성 게시글 수</h5>
          <p>22</p>
        </div>
        <div>
          <h5 className="text-xs font-extrabold">참여 게시글 수</h5>
          <p>11</p>
        </div>
        <div>
          <h5 className="text-xs font-extrabold">저장 게시글 수</h5>
          <p>1</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
