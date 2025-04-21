"use client";

import MainMap from "@/components/map/MainMap";
import ShelterDrawer from "@/components/map/ShelterDrawer";
import InputSearch from "@/components/map/InputSearch";
import ZoomControl from "./ZoomControl";
import CrosshairButton from "./CrosshairButton";

const MapClient = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="pointer-events-none relative flex flex-row justify-center">
        <div className="flex justify-center">
          <InputSearch />
        </div>
      </div>
      <MainMap />
      <div className="absolute top-[80px] right-8 z-40 flex flex-col gap-3">
        <CrosshairButton />
        <ZoomControl />
      </div>
      <div className="flex w-full justify-center">
        <ShelterDrawer />
      </div>
    </div>
  );
};

export default MapClient;
