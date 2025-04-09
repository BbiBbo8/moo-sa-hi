import React from "react";
import ProfileEditPop from "./ProfileEditPop";
import getUser from "@/supabase/getUser";

const ProfileCard = async () => {
  const userData = await getUser();
  return (
    <div className="bg-accent flex flex-col gap-3 rounded-xl border py-4 shadow-sm">
      <div className="flex-row">
        <div className="gap-2">
          <h3 className="text-lg font-bold">{userData.nickname}</h3>
          {/* user 테이블 내 email col은 없는 걸로 파악됨 임시로 uuid 표시 */}
          <h3 className="text-md">{userData.id}</h3>
          {/* 이외 추가 설명이 있다면 들어갈 곳 */}
          <span className="text-xs font-light">추가 설명</span>
        </div>
        {/* 아바타 들어갈 곳 */}
        <figure className="h-24 w-24 rounded-full border bg-gray-200 text-end">
          <ProfileEditPop />
        </figure>
      </div>
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
};

export default ProfileCard;
