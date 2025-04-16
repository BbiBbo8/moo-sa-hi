"use client";
import PATH from "@/constants/PATH";
import { useMarkerStore } from "@/store/useMarkerStore";
import { Shelter } from "@/types/shelter";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ShelterListProps {
  isDrawerOpen: boolean;
  shelters: Shelter[];
}

const ShelterList = ({ isDrawerOpen, shelters }: ShelterListProps) => {
  // 현재 선택된 대피소 이름(마커 클릭)
  const selectedShelterName = useMarkerStore(
    state => state.selectedShelterName,
  );

  // 각 대피소 요소에 대한 ref를 저장할 객체 (스크롤 포커싱에 필요)
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (
      isDrawerOpen &&
      selectedShelterName &&
      refs.current[selectedShelterName]
    ) {
      refs.current[selectedShelterName]?.scrollIntoView({
        behavior: "smooth", // 부드럽게 이동
        block: "center", // 요소를 중앙에 배치
      });
    }
  }, [isDrawerOpen, selectedShelterName]);

  // shelter.name을 key로 하여 current에 해당 DOM 요소 저장
  const setShelterRef = (name: string) => (el: HTMLDivElement | null) => {
    refs.current[name] = el;
  };

  return (
    <div className="z-50 p-4 pb-0">
      {shelters.length > 0 ? (
        shelters.map(shelter => (
          <div
            key={shelter.name + shelter.address}
            ref={setShelterRef(shelter.name)}
            className={`mb-2 flex items-center justify-between rounded-lg p-3 ${
              selectedShelterName === shelter.name ? "bg-yellow-100" : ""
            }`}
          >
            <Link
              className="flex w-full items-center justify-between gap-4"
              href={`${PATH.MAP}/${shelter.id}`}
            >
              <div className="flex flex-col gap-1">
                <h5 className="text-md font-semibold">{shelter.name}</h5>
                <span className="text-xs text-gray-500">{shelter.address}</span>
              </div>
              {shelter.distance !== undefined && (
                <span className="text-sm font-bold whitespace-nowrap text-black">
                  {(shelter.distance / 1000).toFixed(1)} km
                </span>
              )}
            </Link>
          </div>
        ))
      ) : (
        <div className="py-11 text-center text-sm text-gray-500">
          주위에 대피소가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ShelterList;
