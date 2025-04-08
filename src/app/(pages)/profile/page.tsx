import React from "react";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileCard from "@/components/profile/ProfileCard";

const ProfilePage = () => {
  return (
    <section className="m-auto my-2 p-2 text-center">
      {/* 프로필 내용이 들어갈 위치 */}
      <ProfileCard />
      {/* 탭이 들어갈 위치 */}
      <ProfileTabs />
    </section>
  );
};

export default ProfilePage;
