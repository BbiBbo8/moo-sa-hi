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
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import BarsSolid from "public/icons/map/bars-solid.svg";
import Chervon from "public/icons/map/chevron-down-solid.svg";

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
          <Image src={Chervon} width={16} height={16} alt="정렬 모달 버튼" />
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
        <Image src={BarsSolid} width={24} height={24} alt="목록 아이콘" />
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
                  <span className="text-[20px] font-semibold text-[#2889E4]">
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
