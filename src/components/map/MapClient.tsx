"use client";

import MainMap from "@/components/map/MainMap";
import ShelterDrawer from "@/components/map/ShelterDrawer";
import InputSearch from "@/components/map/InputSearch";
import ZoomControl from "./ZoomControl";
import CrosshairButton from "./CrosshairButton";

const MapClient = () => {
  return (
    <div className="relative mx-auto flex h-[852px] max-w-[393px] flex-col items-center justify-center">
      <div className="relative flex flex-row justify-center">
        <div className="flex justify-center">
          <InputSearch />
        </div>
      </div>
      <MainMap />
      <CrosshairButton />
      <ZoomControl />
      <div className="flex w-full justify-center">
        <ShelterDrawer />
      </div>
    </div>
  );
};

export default MapClient;
