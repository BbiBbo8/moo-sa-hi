"use client";

import ProfileEditPop from "./ProfileEditPop";
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
        <ProfileEditPop userId={userAuth.id} nickname={user.nickname} />
      </div>
      {/* 아래의 게시글 수 도전 기능은 일단 구현하지 않음 */}
    </div>
  );
};

export default ProfileCard;
