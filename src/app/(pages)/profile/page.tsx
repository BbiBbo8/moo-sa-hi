import React from "react";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = () => {
  return (
    <section>
    <ProfileCard/>
      {/* 테스트 코드용. 아래에 탭이 들어갑니다 */}
      <ProfileTabs />
    </section>
  );
};

export default ProfilePage;
