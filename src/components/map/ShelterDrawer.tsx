"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ShelterList from "./ShelterList";
import { useMarkerStore } from "@/store/useMarkerStore";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PATH from "@/constants/PATH";
import { ChevronDown } from "lucide-react";
import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useDistance } from "@/hooks/useDistance";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useMapStore } from "@/store/useMapStore";

const ShelterDrawer = () => {
  const { visibleShelters } = useMapStore();
  const { selectedShelterName } = useMarkerStore();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Drawer 트리거 상태 관리 state
  const [isOpen, setIsOpen] = useState(false);
  // 드롭다운 메뉴 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 선택된 정렬 옵션
  const [sortOption, setSortOption] = useState<"relevance" | "distance">(
    "relevance",
  );

  // 드롭다운 외부 클릭 감지
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const { mutate, data: userLocation } = useGeolocationMutation();

  // 위치 요청
  useEffect(() => {
    mutate();
  }, []);

  const sheltersWithDistance = useDistance(
    userLocation ?? { lat: 0, lng: 0 },
    visibleShelters,
  );

  // 마커가 클릭되고 대피소 데이터가 마운트 될 때 트리거 상태 true
  useEffect(() => {
    if (selectedShelterName) {
      setIsOpen(true);
    }
  }, [selectedShelterName]);

  // 정렬 옵션에 따라 대피소 정렬
  const sortedShelters = [...sheltersWithDistance].sort((a, b) => {
    if (sortOption === "distance") {
      return (a.distance || 0) - (b.distance || 0);
    }
    return 0; // 관련도순은 기본 순서 유지
  });

  // 정렬 드롭다운 컴포넌트 (이미지와 같은 형식)
  const SortDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1 text-xs"
        onClick={e => {
          e.stopPropagation(); // Link의 기본 동작을 막기 위해
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
              e.stopPropagation(); // Link의 기본 동작을 막기 위해
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
              e.stopPropagation(); // Link의 기본 동작을 막기 위해
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
      {/* 항상 보이는 미리보기 부분 - 실제 드로어와 별개 */}
      <div
        className="fixed right-0 bottom-0 left-0 z-30 rounded-t-lg border-t border-gray-200 bg-white shadow-lg"
        style={{ display: isOpen ? "none" : "block" }}
        onClick={e => {
          // 드롭다운 클릭 시 드로어가 열리지 않도록 함
          if (!dropdownRef.current?.contains(e.target as Node)) {
            setIsOpen(true);
          }
        }}
      >
        <div className="w-full">
          <div className="bg-muted mx-auto my-4 h-2 w-[100px] shrink-0 rounded-full" />

          <div className="flex items-center justify-between px-4 pb-2">
            <div className="text-sm font-medium">
              내 주변 대피소: {visibleShelters.length}
            </div>
            {visibleShelters.length > 0 && <SortDropdown />}
          </div>

          {/* 미리보기에서 최대 2개의 대피소만 표시 */}
          <div className="flex min-h-[140px] flex-col justify-center space-y-2 px-4 pb-4">
            {visibleShelters.length > 0 ? (
              sortedShelters.slice(0, 2).map(shelter => (
                <div
                  key={shelter.name + shelter.address}
                  className={`flex flex-col rounded-lg p-2 ${
                    selectedShelterName === shelter.name ? "bg-yellow-100" : ""
                  }`}
                >
                  <Link
                    className="flex flex-col gap-1"
                    href={`${PATH.MAP}/${shelter.id}`}
                    onClick={e => e.stopPropagation()} // 클릭 이벤트가 상위로 전파되지 않도록 막음
                  >
                    {/* 시설 이름과 거리 (양 옆 배치) */}
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-semibold">{shelter.name}</h5>
                      {typeof shelter.distance === "number" && (
                        <span className="text-sm font-bold text-black">
                          {(shelter.distance / 1000).toFixed(1)} km
                        </span>
                      )}
                    </div>

                    {/* 주소 (아래쪽) */}
                    <span className="text-xs text-gray-500">
                      {shelter.address}
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                주위에 대피소가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 실제 드로어 */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger className="hidden rounded-t-lg">
          {/* 트리거는 숨겨두고 프로그래밍 방식으로 열기 */}
          <div className="bg-muted mx-auto my-4 h-2 w-[100px] shrink-0 rounded-full" />
        </DrawerTrigger>
        <DrawerContent className="overflow-auto pb-0">
          <DrawerHeader className="pb-2">
            <DrawerTitle />
            <div className="flex items-center justify-between">
              <DrawerDescription>
                주변 대피소 {visibleShelters.length}
              </DrawerDescription>
              {visibleShelters.length > 0 && <SortDropdown />}
            </div>
          </DrawerHeader>
          <ShelterList
            shelters={sortedShelters}
            isDrawerOpen={isOpen}
            sortBy={sortOption}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShelterDrawer;
