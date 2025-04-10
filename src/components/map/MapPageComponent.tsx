"use client";
import { Shelter } from "@/types/shelter";
import { useRef, useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

interface MapProps {
  center: { lat: number; lng: number };
  shelters: Shelter[];
}

const MapPageComponent = ({ center, shelters }: MapProps) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [positions, setPositions] = useState<Shelter[]>([]);

  useEffect(() => {
    if (shelters && Array.isArray(shelters)) {
      setPositions(shelters);
    }
  }, [shelters]);

  return (
    <Map
      center={center}
      level={13}
      className="h-full w-full"
      onCreate={map => {
        mapRef.current = map;
      }}
    >
      <MarkerClusterer averageCenter={true} minLevel={10}>
        {positions.map((shelter, index) => (
          <MapMarker
            key={`${shelter.name}-${shelter.lat}-${shelter.lng}-${index}`} // index를 붙인 이유는 중복되는 좌표가 있어서 방지 하기 위해서이다.
            position={{ lat: shelter.lat, lng: shelter.lng }}
            onClick={() => {
              const newCenter = new kakao.maps.LatLng(shelter.lat, shelter.lng);
              mapRef.current?.panTo(newCenter);
            }}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
};

export default MapPageComponent;
