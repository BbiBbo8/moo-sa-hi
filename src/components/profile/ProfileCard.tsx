"use client";

import ProfileEditPop from "./ProfileEditPop";
import Loading from "@/app/(pages)/Loading";
import { useUserData } from "@/hooks/useUserData";
import Error from "@/app/(pages)/Error";
import SigninDrawer from "../auth/SigninDrawer";
import ProfileTabs from "./ProfileTabs";

const ProfileCard = () => {
  // react-query로 유저 정보 불러오기
  const { data, isLoading, error } = useUserData();
  // 불러온 데이터 정의
  const user = data?.userMetaData;
  const userAuth = data?.user;

  // 로딩 중일 때 로딩중 컴포넌트 표시
  if (isLoading) {
    return <Loading />;
  }
  // 불러오기 오류일 때 오류 컴포넌트 표시
  if (error) {
    return <Error />;
  }

  return (
    <>
      <section className="flex w-full flex-col gap-3 p-5">
        <div className="flex">
          <div className="gap-4">
            {/* 유저가 존재하면 정보 띄우기 */}
            {user && (
              <>
                <h3 className="m-1 text-lg font-bold">{user.nickname}</h3>
                <h3 className="text-md m-1">{userAuth.email}</h3>
              </>
            )}
            {/* 유저가 존재하지 않으면 닉네임 없애기 */}
            {!user && (
              <h3 className="mb-4 p-5 text-lg font-bold">
                로그인이 필요한 서비스입니다.
              </h3>
            )}
          </div>
          {/* 유저가 존재하면 로그아웃과 프로필 수정 띄우기 */}
          {user && (
            <div className="m-4">
              <ProfileEditPop userId={userAuth.id} nickname={user.nickname} />
            </div>
          )}
          {/* 유저가 존재하지 않으면 로그인 띄우기 */}
          {!user && (
            <div className="pt-5">
              <SigninDrawer />
            </div>
          )}
        </div>
      </section>
      {user && <ProfileTabs />}
    </>
  );
};

export default ProfileCard;
