import React from "react";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = () => {
  return (
    <section className="m-2 p-2 text-center">
      {/* 프로필 내용이 들어갈 위치 */}
      <ProfileCard />
      {/* 탭이 들어갈 위치 */}
      <ProfileTabs />
    </section>
  );
};

export default ProfilePage;
