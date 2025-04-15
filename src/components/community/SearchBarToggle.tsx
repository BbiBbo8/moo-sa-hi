"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBarToggle = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchBtn = () => {
    setIsSearchOpen(isSearchOpen => !isSearchOpen);
    setSearchValue("");
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
        <div className="fixed top-28 right-0 left-0 z-50 bg-white p-2">
          <div className="flex items-center space-x-2 px-2">
            <div className="relative flex-1">
              <Input
                autoFocus
                placeholder="검색어를 입력하세요"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="pr-8 pl-4"
              />
              {searchValue && (
                <button
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() => setSearchValue("")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchValue("");
              }}
              className="text-sm font-medium whitespace-nowrap"
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
