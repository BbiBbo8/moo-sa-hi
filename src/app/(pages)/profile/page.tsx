import React from "react";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileEditPop from "@/components/ProfileEditPop";

const ProfilePage = () => {
  return (
    <>
      <div>page</div>
      <ProfileEditPop/>
      {/* 테스트 코드용. 아래에 탭이 들어갑니다 */}
      <ProfileTabs />
    </>
  );
};

export default ProfilePage;
