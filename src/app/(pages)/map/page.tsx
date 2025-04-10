"use client";
import ShelterList from "@/components/map/ShelterList";
import { InputSearch } from "@/components/map/InputSearch";
import { useMapStore } from "@/store/useMapStore";
import { useShelterStore } from "@/store/useShelterStore";
import { useShelterMapEffect } from "@/hooks/useShelterMapEffect";
import MapPageComponent from "@/components/map/MapPageComponent";

const MapPage = () => {
  useShelterMapEffect();

  const { shelters } = useShelterStore();
  const center = useMapStore(state => state.center);
  return (
    <div className="relative mx-auto flex h-[852px] max-w-[393px] flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-row justify-center">
        <div className="flex justify-center">
          <InputSearch
            shelters={shelters}
            setCenter={(lat: number, lng: number) =>
              useMapStore.getState().setCenter({ lat, lng })
            }
          />
        </div>
      </div>
      <MapPageComponent center={center} shelters={shelters} />
      <div className="flex justify-center">
        <ShelterList />
      </div>
    </div>
  );
};

export default MapPage;
