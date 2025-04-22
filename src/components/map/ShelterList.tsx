"use client";

import { useMarkerStore } from "@/store/useMarkerStore";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import PATH from "@/constants/PATH";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Shelter } from "@/types/shelter";

interface ShelterListProps {
  isDrawerOpen: boolean;
  shelters: Shelter[];
  sortOption: "relevance" | "distance";
  setSortOption: Dispatch<SetStateAction<"relevance" | "distance">>;
}

const ShelterList = ({
  isDrawerOpen,
  shelters,
  sortOption,
  setSortOption,
}: ShelterListProps) => {
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

  const setShelterRef = (name: string) => (el: HTMLDivElement | null) => {
    refs.current[name] = el;
  };

  return (
    <ScrollArea className="z-40 h-full overflow-auto pr-2">
      <ScrollAreaViewport className="h-full">
        <div className="z-50 p-4">
          {markedShelter.length > 0 ? (
            markedShelter.map(shelter => (
              <div
                key={shelter.name + shelter.address}
                ref={setShelterRef(shelter.name)}
                className={`mb-2 flex items-center justify-between rounded-lg p-3 ${
                  selectedShelterName === shelter.name ? "bg-yellow-100" : ""
                }`}
              >
                <Link
                  href={`${PATH.MAP}/${shelter.id}`}
                  className="flex flex-col gap-1"
                >
                  <h5 className="text-md font-semibold">{shelter.name}</h5>
                  <span className="text-xs text-gray-500">
                    {shelter.address}
                  </span>
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
