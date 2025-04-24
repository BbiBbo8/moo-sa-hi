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
import { useEffect, useState } from "react";
import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useDistance } from "@/hooks/useDistance";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const ShelterDrawer = () => {
  const markedShelter = useMarkerStore(state => state.markedShelter);
  const selectedShelterName = useMarkerStore(
    state => state.selectedShelterName,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState<"relevance" | "distance">(
    "relevance",
  );

  const { mutate, data: userLocation } = useGeolocationMutation();

  useEffect(() => {
    if (!userLocation) {
      mutate();
    }
  }, [userLocation]);

  const sheltersWithDistance = useDistance(
    userLocation ?? { lat: 0, lng: 0 },
    markedShelter, // visibleShelters 대신 markedShelter 사용
  );

  useEffect(() => {
    if (selectedShelterName) {
      setIsOpen(true);
    }
  }, [selectedShelterName]);

  const sortedShelters = [...sheltersWithDistance].sort((a, b) => {
    if (sortOption === "distance") {
      return (a.distance || 0) - (b.distance || 0);
    }
    return 0; // 관련도순은 기본 순서 유지
  });

  // 정렬 드롭다운 컴포넌트 (이미지와 같은 형식)
  const SortDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-none text-base text-[#999]"
        >
          {sortOption === "relevance" ? "관련도순" : "거리순"}
          <ChevronDown size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[312px] rounded-xl px-0 pt-7 pb-5">
        <DialogHeader className="flex items-center justify-center gap-0">
          <DialogTitle className="text-lg font-medium text-[#1A1A1A]">
            정렬 기준
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="mt-4 flex flex-col">
          <Button
            className="p-3 text-base font-normal text-[#666]"
            variant="ghost"
            onClick={() => {
              setSortOption("distance");
            }}
          >
            거리순
          </Button>
          <Button
            className="p-3 text-base font-normal text-[#666]"
            variant="ghost"
            onClick={() => {
              setSortOption("relevance");
            }}
          >
            관련도순
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {/* 목록 버튼 (중앙 하단) */}
      <button
        onClick={() => setIsOpen(true)} // 버튼 클릭 시 열림
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
                </span>
                {markedShelter.length > 0 && (
                  <span className="text-[20px] font-semibold text-[#58999E]">
                    {markedShelter.length}
                  </span>
                )}
              </DrawerDescription>
              <SortDialog />
            </div>
          </DrawerHeader>

          {/* 리스트 렌더링, 정렬 옵션도 함께 넘김 */}
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
