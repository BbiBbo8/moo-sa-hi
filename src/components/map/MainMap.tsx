"use client";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useMapStore } from "@/store/useMapStore";
import { useShelters } from "@/hooks/shelter/useShelters";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { useMarkerStore } from "@/store/useMarkerStore";
import Image from "next/image";

const MainMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { data: shelters = [], isLoading, error } = useShelters();
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

  // 지도에 표시된 대피소 목록만 필터링하여 상태에 저장
  useEffect(() => {
    if (!mapRef.current || !shelters) return;

    // 현재 지도의 영역 보이는 범위를 가져옴
    const bounds = mapRef.current.getBounds();

    if (level >= 10) {
      setMarkedShelter([]); // 리스트 비우기
      return;
    }

    // 전체 대피소 지도 화면 안에 있는 대피소만 필터링
    const visibleShelters = shelters.filter(shelter =>
      bounds.contain(new kakao.maps.LatLng(shelter.lat, shelter.lng)),
    );

    // 필터링된 대피소 목록을 useMarkerStore 전역 상태로 저장
    setMarkedShelter(visibleShelters);
  }, [shelters, center, level]);

  useEffect(() => {
    reset();
  }, [reset]);

  // 지도 생성 시 실행되는 함수
  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;
    map.setLevel(level);
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  };

  // 마커 클러스터 클릭 시, 해당 클러스터에 포함된 모든 마커들을 지도 중심으로 이동시킴
  const handleClusterClick = (
    _target: kakao.maps.MarkerClusterer,
    cluster: kakao.maps.Cluster,
  ) => {
    const center = cluster.getCenter(); // 클러스터의 중심 좌표 가져오기
    if (center && mapRef.current) {
      mapRef.current.panTo(center); // 지도 이동
      setCenter({ lat: center.getLat(), lng: center.getLng() }); // 상태 업데이트
    }
  };

  // 마커 클릭 시, 해당 대피소로 이동
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
      className="z-0 h-full w-full"
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
                <Image
                  alt="close"
                  src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                  width={14}
                  height={13}
                  className="absolute top-1 right-1"
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
