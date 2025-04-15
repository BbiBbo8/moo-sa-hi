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
  );
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (selectedShelterName) {
      setIsOpen(true);
    }
  }, [selectedShelterName]);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="rounded-t-lg" asChild>
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
        <ShelterList isDrawerOpen={isOpen} />
      </DrawerContent>
    </Drawer>
  );
};

export default ShelterDrawer;
