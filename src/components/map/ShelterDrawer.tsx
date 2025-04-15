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
import { useEffect, useState } from "react";

const ShelterDrawer = () => {
  const markedShelter = useMarkerStore(state => state.markedShelter);
  const selectedShelterName = useMarkerStore(
    state => state.selectedShelterName,
  ); // 마커가 클릭되고 전역 상태에 데이터가 들어오는것을 전송함

  // Drawer 트리거 상태 관리 state
  const [isOpen, setIsOpen] = useState(false);

  // 마커가 클릭되고 대피소 데이터가 마운트 될 때 트리거 상태 true
  useEffect(() => {
    if (selectedShelterName) {
      setIsOpen(true);
    }
  }, [selectedShelterName]);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="rounded-t-lg" asChild>
        {/* asChild 자식요소의 button을 사용 */}
        <button>
          <div className="bg-muted mx-auto my-4 h-2 w-[100px] shrink-0 rounded-full" />
        </button>
      </DrawerTrigger>
      {/* 드로어 내용 */}
      <DrawerContent className="overflow-auto">
        <DrawerHeader>
          <DrawerTitle />
          <DrawerDescription>
            주변 대피소 {markedShelter.length}
          </DrawerDescription>
        </DrawerHeader>
        <ShelterList isDrawerOpen={isOpen} />{" "}
        {/* shelter의 열림상태 전달 내부에서 해당 대피소로 스크롤 포커스를 맞춤 */}
      </DrawerContent>
    </Drawer>
  );
};

export default ShelterDrawer;
