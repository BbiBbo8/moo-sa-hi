"use client";

import { useEffect, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Shelter } from "@/types/shelter";
import { useMapStore } from "@/store/useMapStore";

interface MapProps {
  shelters: Shelter[];
}

const MapPageComponent = ({ shelters }: MapProps) => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 카카오 지도 객체를 저장

  // zustand의 지도 상태 값 가져오기
  const center = useMapStore(state => state.center); // 지도 중심 좌표
  const level = useMapStore(state => state.level); // 지도 확대 레벨
  const setLevel = useMapStore(state => state.setLevel); // 지도 확대 레벨 업데이트
  const setCenter = useMapStore(state => state.setCenter); // 중심 좌표 업데이트
  const reset = useMapStore(state => state.reset); // 상태를 기본값으로 초기화

  // 지도 생성 시 실행되는 함수
  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    // zustand에 저장된 초기값을 지도에 직접 반영
    map.setLevel(level); // 확대 레벨 설정
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng)); // 중심 좌표설정
  };

  // 상태 확인용 콘솔
  useEffect(() => {
    console.log("좌표 :", center);
    console.log("level :", level);
  }, [center, level]);

  // 새로고침 시 축소된 지도로 되돌아가기
  useEffect(() => {
    reset();
  }, []);

  // 확대/축소 레벨이 변경되면 지도에 적용
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setLevel(level);
    }
  }, [level]);

  // 중심 좌표가 변경되면 지도 이동
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
