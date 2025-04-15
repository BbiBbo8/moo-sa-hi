"use client";
import PATH from "@/constants/PATH";
import { useMarkerStore } from "@/store/useMarkerStore";
import Link from "next/link";
import { useEffect, useRef } from "react";

const ShelterList = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
  const markedShelter = useMarkerStore(state => state.markedShelter); // MarkerStore의 저장된 데이터 불러오기
  const selectedShelterName = useMarkerStore(
    state => state.selectedShelterName,
  );

  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  return (
    <div className="z-50 p-4">
      {/* 대피소 목록 렌더링 */}
      {markedShelter.map(shelter => (
        <div
          key={shelter.name + shelter.address}
          ref={(el: HTMLDivElement | null) => {
            refs.current[shelter.name] = el;
          }}
          className={`mb-2 flex items-center justify-between rounded-lg p-3 ${
            selectedShelterName === shelter.name ? "bg-yellow-100" : ""
          }`}
        >
          {/* 대피소 이름 및 주소 정보 */}
          <Link
            className="flex flex-col gap-1"
            href={`${PATH.MAP}/${shelter.id}`}
          >
            <h5 className="text-md font-semibold">{shelter.name}</h5>
            <span className="text-xs text-gray-500">{shelter.address}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
