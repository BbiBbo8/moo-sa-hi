"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ShelterList from "./ShelterList";
import { useMarkerStore } from "@/store/useMarkerStore";
import { useMapStore } from "@/store/useMapStore";
import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useDistance } from "@/hooks/useDistance";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const ShelterDrawer = () => {
  const { visibleShelters } = useMapStore();
  const { selectedShelterName } = useMarkerStore();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState<"relevance" | "distance">(
    "relevance",
  );

  const { mutate, data: userLocation } = useGeolocationMutation();
  useEffect(() => {
    mutate();
  }, []);

  // 마커 클릭 시 Drawer 열기
  useEffect(() => {
    if (selectedShelterName) {
      setIsOpen(true);
    }
  }, [selectedShelterName]);

  // 화면 하단에서 터치 시작 시 Drawer 열기
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0].clientY > window.innerHeight - 50) {
        setIsOpen(true);
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const sheltersWithDistance = useDistance(
    userLocation ?? { lat: 0, lng: 0 },
    visibleShelters,
  );

  // 정렬된 대피소 목록 (불필요한 정렬 방지)
  const sortedShelters = useMemo(() => {
    if (sortOption === "distance") {
      return [...sheltersWithDistance].sort(
        (a, b) => (a.distance || 0) - (b.distance || 0),
      );
    }
    return visibleShelters;
  }, [sortOption, sheltersWithDistance, visibleShelters]);

  const SortDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 py-1 text-sm text-[#999999]"
        onClick={e => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {sortOption === "relevance" ? "관련도순" : "거리순"}
        <ChevronDown size={14} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 z-50 mt-1 w-[120px] rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-100 px-4 py-1 text-sm text-gray-500">
            정렬 기준
          </div>
          <button
            className={`block w-full px-4 py-2 text-left text-sm ${
              sortOption === "distance"
                ? "font-medium text-black"
                : "text-gray-700"
            }`}
            onClick={e => {
              e.stopPropagation();
              setSortOption("distance");
              setIsDropdownOpen(false);
            }}
          >
            거리순
          </button>
          <button
            className={`block w-full px-4 py-2 text-left text-sm ${
              sortOption === "relevance"
                ? "font-medium text-black"
                : "text-gray-700"
            }`}
            onClick={e => {
              e.stopPropagation();
              setSortOption("relevance");
              setIsDropdownOpen(false);
            }}
          >
            관련도순
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 목록 버튼 (중앙 하단) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 flex -translate-x-1/2 flex-row items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2"
        aria-label="대피소 목록 열기"
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="bars-solid">
            <path
              id="Vector"
              d="M0 3.75C0 3.05859 0.574554 2.5 1.28571 2.5H16.7143C17.4254 2.5 18 3.05859 18 3.75C18 4.44141 17.4254 5 16.7143 5H1.28571C0.574554 5 0 4.44141 0 3.75ZM0 10C0 9.30859 0.574554 8.75 1.28571 8.75H16.7143C17.4254 8.75 18 9.30859 18 10C18 10.6914 17.4254 11.25 16.7143 11.25H1.28571C0.574554 11.25 0 10.6914 0 10ZM18 16.25C18 16.9414 17.4254 17.5 16.7143 17.5H1.28571C0.574554 17.5 0 16.9414 0 16.25C0 15.5586 0.574554 15 1.28571 15H16.7143C17.4254 15 18 15.5586 18 16.25Z"
              fill="white"
            />
          </g>
        </svg>
        <p className="text-base font-medium text-white">목록보기</p>
      </button>

      {/* Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DrawerContent className="mt-0 max-h-[80vh] px-5 pb-0">
          <DrawerHeader className="p-0">
            <DrawerTitle className="sr-only">주변 대피소 목록</DrawerTitle>
            <div className="flex items-center justify-between">
              <DrawerDescription className="flex items-center gap-2 py-4">
                <span className="text-[20px] font-semibold text-[#1A1A1A]">
                  주변 대피소
                </span>{" "}
                <span className="text-[20px] font-semibold text-[#58999E]">
                  {visibleShelters.length}
                </span>
              </DrawerDescription>
              <SortDropdown />
            </div>
          </DrawerHeader>

          {/* 리스트 렌더링 먼저 거리 정렬은 후에 */}

          <ShelterList
            shelters={
              sortOption === "distance" && userLocation
                ? sortedShelters
                : visibleShelters
            }
            isDrawerOpen={isOpen}
            sortBy={sortOption}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShelterDrawer;
