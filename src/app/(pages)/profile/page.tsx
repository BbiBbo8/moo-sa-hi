import React from "react";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = () => {
  return (
    <section className="m-auto my-2 p-2 text-center">
      <div className="w-full justify-center">
        <h2 className="bg-gray-200 text-2xl font-semibold">로고</h2>
      </div>
      {/* 프로필 내용이 들어갈 위치 */}
      <ProfileCard />
      {/* 탭이 들어갈 위치 */}
      <ProfileTabs />
    </section>
  );
};

export default ProfilePage;
