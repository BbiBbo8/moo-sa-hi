"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import searchIcon from "public//icons/Property-Activate.svg";

interface SearchBarToggleProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBarToggle: React.FC<SearchBarToggleProps> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchBtn = () => {
    setIsSearchOpen(isSearchOpen => !isSearchOpen);
    setSearchValue("");
    if (isSearchOpen) {
      onSearch(""); // 검색창이 닫힐 때 검색어 초기화
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // 부모 컴포넌트에 검색어 전달
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch(""); // 검색어 지울 때 부모 컴포넌트에도 알림
  };

  return (
    <div className="relative">
      {/* 검색 아이콘 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearchBtn}
        className="p-0"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* 검색창 영역 */}
      {isSearchOpen && (
        <div className="shadow-community-search fixed top-16 right-0 left-0 z-50 flex items-center bg-white px-5 pt-2 pb-3">
          <div className="flex w-full items-center gap-3">
            <div className="relative w-full">
              <Input
                autoFocus
                placeholder="검색어를 입력하세요"
                value={searchValue}
                onChange={handleSearchChange}
                className="border-primary h-10 w-full min-w-[312px] border-1"
              />
              {searchValue && (
                <button
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={handleClear}
                >
                  <Image
                    src={searchIcon}
                    alt="검색 아이콘"
                    width={28}
                    height={28}
                  />
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setIsSearchOpen(false);
                handleClear();
              }}
              className="p-0 text-sm whitespace-nowrap"
            >
              취소
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarToggle;
