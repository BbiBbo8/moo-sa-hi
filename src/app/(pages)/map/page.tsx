"use client";

import ShelterList from "@/components/map/ShelterList";
import { InputSearch } from "@/components/map/InputSearch";
import { useMapStore } from "@/store/useMapStore";
import { useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ShelterDrawer from "@/components/map/ShelterDrawer";

const MapPage = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 참조 생성
  const { center, setCenter } = useMapStore();

  return (
    <div className="relative mx-auto flex h-[852px] max-w-[393px] flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-row justify-center">
        <div className="flex justify-center px-4">
          <InputSearch />
        </div>
      </div>
      <Map
        id="map"
        center={center}
        level={3} // 지도의 확대 레벨
        onCreate={map => (mapRef.current = map)} // 지도 객체 저장
        className="h-full w-full"
      >
        <MapMarker
          position={center}
          onClick={() => {
            if (mapRef.current) {
              // 마커 클릭 시 지도 중심을 이동시킴
              mapRef.current.panTo(
                new kakao.maps.LatLng(center.lat, center.lng),
              );
            }
            setCenter({ lat: center.lat, lng: center.lng });
          }}
        ></MapMarker>
      </Map>
      <div className="flex justify-center">
        {/* <ShelterList /> */}
        <ShelterDrawer />
      </div>
    </div>
  );
};

export default MapPage;
