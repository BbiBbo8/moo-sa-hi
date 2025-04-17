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
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

  const sortedShelters = [...sheltersWithDistance].sort((a, b) => {
    if (sortOption === "distance") {
      return (a.distance || 0) - (b.distance || 0);
    }
    return 0;
  });

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
        className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
        aria-label="대피소 목록 열기"
      >
        <Image
          src="/icons/map/List Open.svg" // ← 이 부분은 실제 아이콘 경로에 맞게 수정
          alt="아이콘"
          width={104}
          height={40}
        />
      </button>

      {/* Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="overflow-auto pb-0">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="sr-only">주변 대피소 목록</DrawerTitle>
            <div className="flex items-center justify-between">
              <DrawerDescription>
                주변 대피소 {visibleShelters.length}
              </DrawerDescription>
              {visibleShelters.length > 0 && <SortDropdown />}
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