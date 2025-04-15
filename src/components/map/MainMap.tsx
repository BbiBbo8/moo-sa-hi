"use client";

import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useMapStore } from "@/store/useMapStore";
import { useShelters } from "@/hooks/shelter/useShelters";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { useMarkerStore } from "@/store/useMarkerStore";

const MainMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 카카오 지도 객체를 저장
  const { data: shelters = [], isLoading, error } = useShelters(); // tanstackquery로 이용한 hook기능
  const [selectMarker, setSelectMarker] = useState<string | null>(null);

  // 대피소 중 현재 지도에 보이는 것만 필터링해서 zustand useMarkerStore에 저장
  const setMarkedShelter = useMarkerStore(state => state.setMarkedShelter);
  const setSelectedShelterName = useMarkerStore(
    state => state.setSelectedShelterName,
  );

  // zustand의 지도 상태 값 가져오기
  const center = useMapStore(state => state.center);
  const level = useMapStore(state => state.level);
  const setLevel = useMapStore(state => state.setLevel);
  const setCenter = useMapStore(state => state.setCenter);
  const reset = useMapStore(state => state.reset);

  useEffect(() => {
    // shelters 데이터가 없으면 아무것도 않함함
    if (!mapRef.current || !shelters) return;

    // 현재 지도의 영역 보이는 범위를 가져옴옴
    const bounds = mapRef.current.getBounds();

    // 전체 대피소 지도 화면 안에 있는 대피소만 필터링
    const check = shelters.filter(shelter =>
      bounds.contain(new kakao.maps.LatLng(shelter.lat, shelter.lng)),
    );

    // 필터링된 대피소 목록을 useMarkerStore 전역 상태로 저장장
    setMarkedShelter(check);
  }, [shelters, center, level]);

  // 지도 생성 시 실행되는 함수
  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    // zustand에 저장된 초기값을 지도에 직접 반영
    map.setLevel(level); // 확대 레벨 설정
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng)); // 중심 좌표설정
  };

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

  // 마커 클러스터 이동 로직
  const handleClusterClick = (
    _target: kakao.maps.MarkerClusterer,
    cluster: kakao.maps.Cluster,
  ) => {
    const center = cluster.getCenter(); // 중심 위치 구하기
    if (center && mapRef.current) {
      mapRef.current.panTo(center); // 지도 이동
      setCenter({ lat: center.getLat(), lng: center.getLng() }); // 상태 업데이트
    }
  };

  // 마커 클릭 로직
  const handleMarkerClick = (lat: number, lng: number, name: string) => {
    const newCenter = new kakao.maps.LatLng(lat, lng);
    mapRef.current?.panTo(newCenter); // 지도 이동
    setCenter({ lat, lng }); // 상태 업데이트
    setSelectMarker(name);
    setSelectedShelterName(name);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

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
      <MarkerClusterer
        averageCenter={true}
        minLevel={10}
        onClusterclick={handleClusterClick}
      >
        {shelters.map((shelter, index) => (
          <MapMarker
            key={`${shelter.name}-${index}`}
            position={{ lat: shelter.lat, lng: shelter.lng }}
            onClick={() =>
              handleMarkerClick(shelter.lat, shelter.lng, shelter.name)
            }
          >
            {selectMarker === shelter.name && (
              <div className="relative min-w-[150px] p-2 text-sm whitespace-nowrap text-black">
                <img
                  alt="close"
                  src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                  className="absolute top-1 right-1 h-[13px] w-[14px]"
                  onClick={() => setSelectMarker(null)}
                />
                <div className="flex flex-col gap-0.5 pr-6 whitespace-nowrap">
                  <span className="font-semibold">{shelter.name}</span>
                  <span className="text-gray-600">{shelter.address}</span>
                </div>
              </div>
            )}
          </MapMarker>
        ))}
      </MarkerClusterer>
    </Map>
  );
};

export default MainMap;
