"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useEffect, useRef } from "react";
import { useMapStore } from "@/store/useMapStore";

interface DetailMapProps {
  lat: number;
  lng: number;
  name: string;
}

const DetailMap = ({ lat, lng, name }: DetailMapProps) => {
  const setCenter = useMapStore(state => state.setCenter);
  const setLevel = useMapStore(state => state.setLevel);
  const mapRef = useRef<kakao.maps.Map>(null);

  useEffect(() => {
    setCenter({ lat, lng });
    setLevel(4);
  }, [lat, lng, setCenter, setLevel]);

  // 화면 크기 변경 감지 및 처리
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      // 지도 크기 재조정 후 중심점 재설정
      if (mapRef.current) {
        mapRef.current.relayout();
        // 지도 중심점 강제 재설정
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.setCenter(new kakao.maps.LatLng(lat, lng));
          }
        }, 100);
      }
    };

    // 초기 로드 시에도 한 번 실행
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [lat, lng]);

  return (
    <Map
      center={{ lat, lng }}
      level={3}
      className="h-full w-full"
      onCreate={map => {
        mapRef.current = map;
      }}
    >
      <MapMarker position={{ lat, lng }}>
        <div className="text-xs">{name}</div>
      </MapMarker>
    </Map>
  );
};

export default DetailMap;
