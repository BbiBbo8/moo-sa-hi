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
    <div className="z-40 flex flex-col overflow-hidden rounded-md shadow-md">
      <button
        onClick={handleZoomIn}
        className="flex h-10 w-10 items-center justify-center bg-white"
      >
        <Image
          src={"/icons/map/plus-solid.svg"}
          alt="확대"
          width={20}
          height={20}
        />
      </button>
      <button
        onClick={handleZoomOut}
        className="flex h-10 w-10 items-center justify-center border-t-gray-400 bg-white"
      >
        <Image
          src={"/icons/map/minus-solid.svg"}
          alt="축소"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default ZoomControl;
