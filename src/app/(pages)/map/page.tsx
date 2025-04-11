"use client";
// import ShelterList from "@/components/map/ShelterList";

import { useShelterStore } from "@/store/useShelterStore";
import { useShelterMapEffect } from "@/hooks/useShelterMapEffect";
import MapPageComponent from "@/components/map/MapPageComponent";
import ShelterDrawer from "@/components/map/ShelterDrawer";
import InputSearch from "@/components/map/InputSearch";

const MapPage = () => {
  useShelterMapEffect();

  const { shelters } = useShelterStore();
  return (
    <div className="relative mx-auto flex h-[852px] max-w-[393px] flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-row justify-center">
        <div className="flex justify-center">
          <InputSearch shelters={shelters} />
        </div>
      </div>
      <MapPageComponent shelters={shelters} />
      <div className="flex justify-center">
        {/* <ShelterList /> */}
        <ShelterDrawer />
      </div>
    </div>
  );
};

export default MapPage;
