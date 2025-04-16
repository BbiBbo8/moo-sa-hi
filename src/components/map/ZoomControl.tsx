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
    <div className="absolute right-2 bottom-[320px] z-40 flex flex-col gap-1">
      <button onClick={handleZoomIn}>
        <Image
          src="/icons/plus-solid.png"
          alt="Zoom In"
          width={28}
          height={28}
          className="rounded-sm bg-white p-1 shadow-md"
        />
      </button>
      <button onClick={handleZoomOut}>
        <Image
          src="/icons/minus-solid.png"
          alt="Zoom Out"
          width={28}
          height={28}
          className="rounded-sm bg-white p-1 shadow-md"
        />
      </button>
    </div>
  );
};

export default ZoomControl;
