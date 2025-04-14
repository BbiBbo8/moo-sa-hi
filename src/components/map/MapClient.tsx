"use client";

import MainMap from "@/components/map/MainMap";
import ShelterDrawer from "@/components/map/ShelterDrawer";
import InputSearch from "@/components/map/InputSearch";

const MapClient = () => {
  return (
    <div className="relative mx-auto flex h-[852px] max-w-[393px] flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-row justify-center">
        <div className="flex justify-center">
          <InputSearch />
        </div>
      </div>
      <MainMap />
      <div className="flex justify-center">
        <ShelterDrawer />
      </div>
    </div>
  );
};

export default MapClient;
