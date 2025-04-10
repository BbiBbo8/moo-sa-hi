"use client";

import { useEffect, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Shelter } from "@/types/shelter";
import { useMapStore } from "@/store/useMapStore";

interface MapProps {
  shelters: Shelter[];
}

const MapPageComponent = ({ shelters }: MapProps) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const center = useMapStore(state => state.center);
  const level = useMapStore(state => state.level);
  const setLevel = useMapStore(state => state.setLevel);
  const setCenter = useMapStore(state => state.setCenter);
  const reset = useMapStore(state => state.reset);

  // ✅ onCreate 시 초기값 반영
  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    // 지도에 zustand 초기값 강제 적용
    map.setLevel(level);
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  };

  useEffect(() => {
    console.log("좌표 :", center);
    console.log("level :", level);
  }, [center, level]);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setLevel(level);
    }
  }, [level]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(new kakao.maps.LatLng(center.lat, center.lng));
    }
  }, [center]);

  return (
    <Map
      center={center} // 초깃값으로만 사용됨
      level={level} // 초기 level
      className="h-full w-full"
      onCreate={handleCreate}
      onZoomChanged={map => {
        setLevel(map.getLevel());
      }}
    >
      <MarkerClusterer averageCenter={true} minLevel={10}>
        {shelters.map((shelter, index) => (
          <MapMarker
            key={`${shelter.name}-${index}`}
            position={{ lat: shelter.lat, lng: shelter.lng }}
            onClick={() => {
              const newCenter = new kakao.maps.LatLng(shelter.lat, shelter.lng);
              mapRef.current?.panTo(newCenter);
              setCenter({ lat: shelter.lat, lng: shelter.lng });
            }}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
};

export default MapPageComponent;
