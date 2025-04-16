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
import Link from "next/link";
import PATH from "@/constants/PATH";
import { useMapStore } from "@/store/useMapStore";

const ShelterDrawer = () => {
  const { visibleShelters } = useMapStore();
  const { selectedShelterName } = useMarkerStore();

  // Drawer 트리거 상태 관리 state
  const [isOpen, setIsOpen] = useState(false);

  // 마커가 클릭되고 대피소 데이터가 마운트 될 때 트리거 상태 true
  useEffect(() => {
    if (selectedShelterName) {
      setIsOpen(true);
    }
  }, [selectedShelterName]);
  return (
    <>
      {/* 항상 보이는 미리보기 부분 - 실제 드로어와 별개 */}
      <div
        className="fixed right-0 bottom-0 left-0 z-30 rounded-t-lg border-t border-gray-200 bg-white shadow-lg"
        style={{ display: isOpen ? "none" : "block" }}
        onClick={() => setIsOpen(true)}
      >
        <div className="w-full">
          <div className="bg-muted mx-auto my-4 h-2 w-[100px] shrink-0 rounded-full" />
          <div className="px-4 pb-2 text-sm font-medium">
            내 주변 대피소: {visibleShelters.length}
          </div>

          {/* 미리보기에서 최대 2개의 대피소만 표시 */}
          <div className="flex min-h-[140px] flex-col justify-center space-y-2 px-4 pb-4">
            {visibleShelters.length > 0 ? (
              visibleShelters.slice(0, 2).map(shelter => (
                <div
                  key={shelter.name + shelter.address}
                  className={`flex items-center justify-between rounded-lg p-2 ${
                    selectedShelterName === shelter.name ? "bg-yellow-100" : ""
                  }`}
                >
                  <Link
                    className="flex flex-col gap-1"
                    href={`${PATH.MAP}/${shelter.id}`}
                  >
                    <h5 className="text-sm font-semibold">{shelter.name}</h5>
                    <span className="text-xs text-gray-500">
                      {shelter.address}
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                주위에 대피소가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 실제 드로어 */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger className="hidden rounded-t-lg">
          {/* 트리거는 숨겨두고 프로그래밍 방식으로 열기 */}
          <div className="bg-muted mx-auto my-4 h-2 w-[100px] shrink-0 rounded-full" />
        </DrawerTrigger>
        <DrawerContent className="overflow-auto pb-0">
          <DrawerHeader className="pb-2">
            <DrawerTitle />
            <DrawerDescription>
              주변 대피소 {visibleShelters.length}
            </DrawerDescription>
          </DrawerHeader>
          <ShelterList shelters={visibleShelters} isDrawerOpen={isOpen} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShelterDrawer;
