"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useMapStore } from "@/store/useMapStore";
import { useShelters } from "@/hooks/shelter/useShelters";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { useMarkerStore } from "@/store/useMarkerStore";
import Image from "next/image";
import { debounce } from "lodash";
import { getMarkerImage } from "@/utils/markerImage";

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
  const currentLocation = useMapStore(state => state.currentLocation);

  // 필터링 로직을 useCallback으로 메모이제이션
  const filterVisibleShelters = useCallback(() => {
    if (!mapRef.current || !shelters.length) return [];

    // 현재 지도의 영역 보이는 범위를 가져옴
    const bounds = mapRef.current.getBounds();

    if (level >= 14) {
      return []; // 확대 레벨이 14 이상이면 빈 배열 반환
    }

    // 전체 대피소 지도 화면 안에 있는 대피소만 필터링
    return shelters.filter(shelter =>
      bounds.contain(new kakao.maps.LatLng(shelter.lat, shelter.lng)),
    );
  }, [shelters, level]);

  // 지도에 표시된 대피소 목록만 필터링하여 상태에 저장
  useEffect(() => {
    if (!mapRef.current) return;

    // 현재 확대 레벨에서 보이는 대피소만 필터링하여 저장
    const visibleShelters = filterVisibleShelters();
    setMarkedShelter(visibleShelters);
  }, [filterVisibleShelters, setMarkedShelter]);

  // 초기화는 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    reset();
  }, [reset]);

  // 지도 생성 시 실행되는 함수
  const handleCreate = useCallback(
    (map: kakao.maps.Map) => {
      mapRef.current = map;
      map.setLevel(level);
      map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));

      // 지도 영역 변경 이벤트 리스너 추가 (디바운스 적용)
      kakao.maps.event.addListener(
        map,
        "bounds_changed",
        debounce(() => {
          if (mapRef.current) {
            const visible = filterVisibleShelters();
            setMarkedShelter(visible);
          }
        }, 300),
      ); // 300ms 동안 이벤트이 없으면 실행
    },
    [center, level, filterVisibleShelters, setMarkedShelter],
  ); // filterVisibleShelters와 setMarkedShelter를 의존성 배열에 추가

  // 마커 클러스터 클릭 시, 해당 클러스터에 포함된 모든 마커들을 지도 중심으로 이동시킴
  const handleClusterClick = useCallback(
    (_target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
      const clusterCenter = cluster.getCenter(); // 클러스터의 중심 좌표 가져오기
      if (clusterCenter && mapRef.current) {
        mapRef.current.panTo(clusterCenter); // 지도 이동
        setCenter({ lat: clusterCenter.getLat(), lng: clusterCenter.getLng() }); // 상태 업데이트

        const currentLevel = mapRef.current.getLevel();
        mapRef.current.setLevel(currentLevel - 1); // 현재 레벨에서 1 감소 (확대)
        setLevel(currentLevel - 1); // Zustand 상태 업데이트
      }
    },
    [setCenter, setLevel],
  );

  // 마커 클릭 시, 해당 대피소로 이동
  const handleMarkerClick = useCallback(
    (lat: number, lng: number, name: string) => {
      const newCenter = new kakao.maps.LatLng(lat, lng);
      mapRef.current?.panTo(newCenter); // 지도 이동
      setCenter({ lat, lng }); // 상태 업데이트
      setSelectMarker(name);
      setSelectedShelterName(name);
    },
    [setCenter, setSelectedShelterName],
  );

  // 렌더링에 필요한 대피소만 메모이제이션하여 사용
  const visibleShelters = useMemo(() => {
    if (level >= 14) return []; // 확대 레벨이 14 이상이면 마커를 표시하지 않음
    return shelters;
  }, [shelters, level]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <Map
      key={
        currentLocation
          ? `${currentLocation.lat}-${currentLocation.lng}`
          : "map"
      }
      center={center}
      level={level}
      className="z-0 h-full w-full"
      onCreate={handleCreate}
    >
      <MarkerClusterer
        averageCenter={false}
        minLevel={7}
        onClusterclick={handleClusterClick}
      >
        {visibleShelters.map((shelter, index) => (
          <MapMarker
            key={`${shelter.name}-${index}`}
            position={{ lat: shelter.lat, lng: shelter.lng }}
            image={getMarkerImage("selected")}
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
        {currentLocation && (
          <MapMarker
            position={currentLocation}
            image={{
              src: "/icons/map/my-location.svg", // 혹은 data URL로 svg 직접 넣기
              size: { width: 24, height: 24 },
              options: { offset: { x: 12, y: 12 } }, // 중심 정렬
            }}
          />
        )}
      </MarkerClusterer>
    </Map>
  );
};

export default MainMap;
