"use client";

import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useMapStore } from "@/store/useMapStore";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";

const MapPageComponent = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 카카오 지도 객체를 저장
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // zustand의 지도 상태 값 가져오기
  const center = useMapStore(state => state.center);
  const level = useMapStore(state => state.level);
  const setLevel = useMapStore(state => state.setLevel);
  const setCenter = useMapStore(state => state.setCenter);
  const reset = useMapStore(state => state.reset);

  // 지도 생성 시 실행되는 함수
  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    // zustand에 저장된 초기값을 지도에 직접 반영
    map.setLevel(level); // 확대 레벨 설정
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng)); // 중심 좌표설정
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSheltersApi(); // 서버 함수 호출
        setShelters(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      center={center}
      level={level}
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
