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
import { Button } from "../ui/button";
import { useShelterStore } from "@/store/useShelterStore";

const ShelterDrawer = () => {
  const { shelters } = useShelterStore();
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
          <DrawerDescription>내 주변 대피소</DrawerDescription>
        </DrawerHeader>
        <ShelterList shelters={shelters} />
      </DrawerContent>
    </Drawer>
  );
};

export default ShelterDrawer;
