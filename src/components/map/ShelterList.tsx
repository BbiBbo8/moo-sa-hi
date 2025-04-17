"use client";
import PATH from "@/constants/PATH";
import { useMarkerStore } from "@/store/useMarkerStore";
import { Shelter } from "@/types/shelter";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ShelterListProps {
  isDrawerOpen: boolean;
  shelters: Shelter[];
  sortBy: "relevance" | "distance"; // 정렬 기준
}

const ShelterList = ({ isDrawerOpen, shelters, sortBy }: ShelterListProps) => {
  const selectedShelterName = useMarkerStore(
    state => state.selectedShelterName,
  );

  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Drawer가 열리고 선택된 대피소가 있으면 그 대피소로 스크롤 이동
  useEffect(() => {
    if (
      isDrawerOpen &&
      selectedShelterName &&
      refs.current[selectedShelterName]
    ) {
      refs.current[selectedShelterName]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isDrawerOpen, selectedShelterName]);

  const setShelterRef = (name: string) => (el: HTMLDivElement | null) => {
    refs.current[name] = el;
  };

  // 거리순 정렬 함수 (distance 기준)
  const sortedShelters =
    sortBy === "distance"
      ? shelters.sort((a, b) => {
          // distance 값이 존재하면 정렬
          if (a.distance && b.distance) {
            return a.distance - b.distance;
          }
          return 0;
        })
      : shelters;

  return (
    <div className="z-40 p-4 pb-0">
      {sortedShelters.length > 0 ? (
        sortedShelters.map(shelter => {
          return (
            <div
              key={shelter.name + shelter.address}
              ref={setShelterRef(shelter.name)}
              className={`mb-5 flex h-[74px] flex-col items-center justify-center ${
                selectedShelterName === shelter.name ? "bg-yellow-100" : ""
              }`}
            >
              <Link
                className="flex w-[353px] flex-row items-center justify-center gap-5"
                href={`${PATH.MAP}/${shelter.id}`}
                onClick={e => e.stopPropagation()} // 드롭다운 클릭을 방지하기 위해 이벤트 전파를 막음
              >
                <div className="flex w-64 flex-col items-start gap-1 truncate">
                  <h5 className="text-[16px] font-semibold text-[#333333]">
                    {shelter.name}
                  </h5>
                  <span className="text-[14px] font-thin text-[#808080]">
                    {shelter.address}
                  </span>
                </div>

                {/* "distance" 기준일 때만 km 표시, distance 값이 없을 경우도 처리 */}
                {typeof shelter.distance === "number" && (
                  <span className="flex w-10 flex-1 items-center justify-center text-sm text-[#666666]">
                    {(shelter.distance / 1000).toFixed(1)} km
                  </span>
                )}
              </Link>
            </div>
          );
        })
      ) : (
        <div className="py-11 text-center text-sm text-gray-500">
          주위에 대피소가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ShelterList;
