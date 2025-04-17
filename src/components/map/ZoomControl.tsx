"use client";
import { useMapStore } from "@/store/useMapStore";
import Image from "next/image";

const ZoomControl = () => {
  const setLevel = useMapStore(state => state.setLevel);
  const level = useMapStore(state => state.level);

  const handleZoomIn = () => {
    if (level > 1) setLevel(level - 1);
  };

  const handleZoomOut = () => {
    if (level < 14) setLevel(level + 1);
  };

  return (
    <div className="absolute right-2 bottom-[358px] z-40 flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        className="flex h-10 w-10 items-center justify-center rounded-sm bg-white p-1 shadow-md"
      >
        <Image
          src="/icons/plus-solid.png"
          alt="Zoom In"
          width={24}
          height={24}
        />
      </button>
      <button
        onClick={handleZoomOut}
        className="flex h-10 w-10 items-center justify-center rounded-sm bg-white p-1 shadow-md"
      >
        <Image
          src="/icons/minus-solid.png"
          alt="Zoom Out"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default ZoomControl;
