import React from "react";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileEditPop from "@/components/ProfileEditPop";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = () => {
  return (
    <section>
    <ProfileCard/>
      {/* 테스트 코드용. 아래에 프로필 수정 모달(pop)이 들어갑니다 */}
      <ProfileEditPop/>
      {/* 테스트 코드용. 아래에 탭이 들어갑니다 */}
      <ProfileTabs />
    </section>
  );
};

export default ProfilePage;
