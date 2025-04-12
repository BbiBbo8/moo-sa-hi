"use client";

import ProfileEditPop from "./ProfileEditPop";
import { Avatar, AvatarImage } from "../ui/avatar";
import Loading from "@/app/(pages)/Loading";
import { useUserData } from "@/hooks/useUserData";
import Error from "@/app/(pages)/Error";
import { LogoutButton } from "../auth/LogoutButton";

const ProfileCard = () => {
  // react-query로 유저 정보 불러오기
  const { data, isLoading, error } = useUserData();
  // 불러온 데이터 정의
  const user = data?.userMetaData;
  const userAuth = data?.user;

  // 로딩 중일 때 로딩중 컴포넌트 표시
  if (isLoading) return <Loading />;
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error) return <Error />;

  return (
    <div className="bg-accent flex flex-col gap-3 rounded-xl border py-4 shadow-sm">
      <div className="flex-row">
        <div className="gap-2">
          <h3 className="text-lg font-bold">{user.nickname}</h3>
          <h3 className="text-md">{userAuth.email}</h3>
          {/* 이외 추가 설명이 있다면 들어갈 곳 */}
          <span className="text-xs font-light">추가 설명</span>
        </div>
        {/* TEST: 임시 로그아웃 버튼 추가 */}
        <LogoutButton />
        {/* 아바타 들어갈 곳 */}
        <Avatar className="size-16">
          <AvatarImage src={userAuth.user_metadata.avatar_url} />
        </Avatar>
        <ProfileEditPop
          userId={userAuth.id}
          nickname={user.nickname}
          avatarUrl={userAuth.user_metadata.avatar_url}
        />
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
