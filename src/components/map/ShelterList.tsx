"use client";
import PATH from "@/constants/PATH";
import { useMarkerStore } from "@/store/useMarkerStore";
import { Shelter } from "@/types/shelter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";

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
    <ScrollArea className="z-40 h-full overflow-auto pr-2">
      <ScrollAreaViewport className="h-full">
        <div className="pb-0">
          {sortedShelters.length > 0 ? (
            sortedShelters.map(shelter => (
              <div
                key={shelter.name + shelter.address}
                ref={setShelterRef(shelter.name)}
                className={`mb-7 flex flex-col py-4 ${
                  selectedShelterName === shelter.name ? "bg-yellow-100" : ""
                }`}
              >
                <Link
                  href={`${PATH.MAP}/${shelter.id}`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex w-[200px] flex-col gap-1 text-start">
                      <h5 className="truncate text-[16px] font-semibold text-[#333333]">
                        {shelter.name}
                      </h5>
                      <span className="truncate text-[14px] font-thin text-[#808080]">
                        {shelter.address}
                      </span>
                    </div>
                    {typeof shelter.distance === "number" && (
                      <span className="flex items-center text-sm font-normal text-[#666666]">
                        {(shelter.distance / 1000).toFixed(1)} km
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center px-5 pb-8">
              <div className="flex flex-col items-center text-sm text-gray-500">
                <Image
                  alt=""
                  width={80}
                  height={80}
                  className="px-[10px] py-[13.333px]"
                  src={"/icons/map/map-location-dot-solid.png"}
                />
                <span>주변에 대피소를 찾을 수 없어요</span>
                <span>위치를 다시 확인해주세요</span>
              </div>
            </div>
          )}
        </div>
      </ScrollAreaViewport>
    </ScrollArea>
  );
};

export default ShelterList;
