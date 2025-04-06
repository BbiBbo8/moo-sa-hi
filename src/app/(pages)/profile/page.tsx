import React from "react";
import ProfileTabs from "@/components/ProfileTabs";

const ProfilePage = () => {
  return (
    <section className="text-center">
      {/* 아바타 컴포넌트와 카드 컴포넌트 추가후 수정 */}
      <section>
        <div>닉네임</div>
        <div>아바타</div>
      </section>
      {/* 테스트 코드용. 아래에 탭이 들어갑니다 */}
      <ProfileTabs />
    </section>
  );
};

export default ProfilePage;
