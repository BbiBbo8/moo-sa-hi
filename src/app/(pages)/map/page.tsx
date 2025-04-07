"use client";

import ShelterList from "@/components/map/ShelterList";
import { InputSearch } from "@/components/map/InputSearch";
import { useMapStore } from "@/store/useMapStore";
import { useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapPage = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 참조 생성
  const { center, setCenter } = useMapStore();

  return (
    <div className="flex justify-center flex-col max-w-[393px] mx-auto h-[852px] items-center relative overflow-hidden ">
      <div className="flex flex-row justify-center relative">
        <div className="flex justify-center">
          <InputSearch />
        </div>
         
      </div>
      <Map
        id="map"
        center={center}
        level={3} // 지도의 확대 레벨
        onCreate={(map) => (mapRef.current = map)} // 지도 객체 저장
        className="w-full h-full"
      >
        <MapMarker
          position={center}
          onClick={() => {
            if (mapRef.current) {
              // 마커 클릭 시 지도 중심을 이동시킴
              mapRef.current.panTo(
                new kakao.maps.LatLng(center.lat, center.lng)
              );
            }
            setCenter({ lat: center.lat, lng: center.lng });
          }}
        ></MapMarker>
      </Map>
      <div className="flex justify-center">
        <ShelterList />
      </div>
    </div>
  );
};

export default MapPage;
