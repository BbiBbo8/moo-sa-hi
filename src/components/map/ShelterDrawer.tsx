import React from "react";
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

const ShelterDrawer = () => {
  const checkShelters = useMarkerStore(state => state.checkShelters);
  return (
    <Drawer>
      {/* 드로어 열기 트리거 */}
      {/* 드로어 트리거 가시성이 좋지 않아 이후 추가 리팩토링 계획 있음 */}
      <DrawerTrigger className="rounded-t-lg">
        <div className="bg-muted mx-auto my-4 h-2 w-[100px] shrink-0 rounded-full" />
      </DrawerTrigger>
      {/* 드로어 내용 */}
      <DrawerContent className="overflow-auto">
        <DrawerHeader>
          {/* 내용이 들어가지 않아도 title을 필수로 넣어야 한다 */}
          <DrawerTitle />
          <DrawerDescription>
            주변 대피소 {checkShelters.length}
          </DrawerDescription>
        </DrawerHeader>
        <ShelterList /> {/* 대피소 리스트트 */}
      </DrawerContent>
    </Drawer>
  );
};

export default ShelterDrawer;
