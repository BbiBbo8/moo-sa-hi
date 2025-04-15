import PATH from "@/constants/PATH";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import SearchBarToggle from "./SearchBarToggle";

interface CommunityHeaderProps {
  setSearchTerm: (searchTerm: string) => void;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ setSearchTerm }) => {
  const pathname = usePathname();

  return (
    <section className="absolute top-3 flex w-full flex-row items-center justify-between px-5 text-[18px]">
      {/* 커뮤니티 이동 탭 */}
      <div className="flex gap-4">
        <Link
          href={PATH.COMMUNITYSHELTER}
          className={
            pathname === PATH.COMMUNITYSHELTER
              ? "underline underline-offset-8"
              : ""
          }
        >
          대피소
        </Link>
        <Link
          href={PATH.COMMUNITYDAILY}
          className={
            pathname === PATH.COMMUNITYDAILY
              ? "underline underline-offset-8"
              : ""
          }
        >
          일상
        </Link>
      </div>

      <div className="flex">
        <SearchBarToggle onSearch={setSearchTerm} />
      </div>
    </section>
  );
};

export default CommunityHeader;
