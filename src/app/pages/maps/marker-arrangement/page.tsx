"use client";

import { useMapStore } from "@/store/useMapStore";
import { useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Home() {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 참조 생성
  const { center, setCenter } = useMapStore();

  return (
    <div>
      <Map // 지도를 표시할 Container
        id="map"
        center={center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "350px",
        }}
        level={3} // 지도의 확대 레벨
        onCreate={(map) => (mapRef.current = map)} // 지도 객체 저장
      >
        <MapMarker
          position={center}
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.panTo(
                new kakao.maps.LatLng(center.lat, center.lng)
              );
            }
            setCenter({ lat: center.lat, lng: center.lng });
          }}
        >
          <div>Hello World!</div>
        </MapMarker>
      </Map>
    </div>
  );
}
