import ProfileCard from "@/components/profile/ProfileCard";

const ProfilePage = () => {
  return (
    <main className="mx-auto w-full max-w-[640px] min-w-[320px]">
      {/* 프로필 내용이 들어갈 위치 */}
      <ProfileCard />
    </main>
  );
};

export default ProfilePage;
