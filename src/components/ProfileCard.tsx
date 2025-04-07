import React from "react";
import ProfileEditPop from "./ProfileEditPop";

function ProfileCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border py-4 shadow-sm">
      <div className="gap-2">
        <h3 className="text-lg font-bold">닉네임</h3>
        <h3 className="text-md">@email.com</h3>
        {/* 이외 추가 설명이 있다면 들어갈 곳 */}
        <span className="text-xs font-light">추가 설명</span>
      </div>
      {/* 아바타 들어갈 곳 */}
      <figure className="h-24 w-24 rounded-full border bg-gray-200">
        <div>아바타</div>
        <ProfileEditPop />
      </figure>
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
