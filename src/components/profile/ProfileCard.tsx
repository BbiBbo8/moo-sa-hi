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
      <section className="flex w-full flex-col gap-3 px-5 pt-[82px]">
        <div className="flex justify-between">
          <div className="gap-4">
            {/* 유저가 존재하면 정보 띄우기 */}
            {user && (
              <>
                <h3 className="m-1 text-lg font-medium text-gray-900">
                  {user.nickname}
                </h3>
                <h3 className="m-1 text-sm text-gray-600">{userAuth?.email}</h3>
              </>
            )}
          </div>
          {/* 유저가 존재하면 로그아웃과 프로필 수정 띄우기 */}
          {user && (
            <div className="mt-3">
              <ProfileEditPop userId={userAuth?.id} nickname={user.nickname} />
            </div>
          )}
        </div>
        {/* 유저가 존재하지 않으면 닉네임 없애고 로그인 버튼 생기기 */}
        {!user && (
          <div className="mt-4 flex flex-row justify-between">
            <h3 className="text-lg font-medium">
              로그인 하면 더 많은
              <br /> 기능을 사용할 수 있어요!
            </h3>
            <div className="text-center">
              <SigninDrawer />
            </div>
          </div>
        )}
      </section>
      <ProfileTabs />
    </>
  );
};

export default ProfileCard;
