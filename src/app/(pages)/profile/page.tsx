import React from "react";
import ProfileCard from "@/components/profile/ProfileCard";

const ProfilePage = () => {
  return (
    <main className="m-auto my-2 p-5">
      {/* 프로필 내용이 들어갈 위치 */}
      <ProfileCard />
    </main>
  );
};

export default ProfilePage;
