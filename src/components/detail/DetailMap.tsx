"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useEffect } from "react";
import { useMapStore } from "@/store/useMapStore";

interface DetailMapProps {
  lat: number;
  lng: number;
  name: string;
}

const DetailMap = ({ lat, lng, name }: DetailMapProps) => {
  const setCenter = useMapStore(state => state.setCenter);
  const setLevel = useMapStore(state => state.setLevel);

  useEffect(() => {
    setCenter({ lat, lng });
    setLevel(4);
  }, [lat, lng, setCenter, setLevel]);

  return (
    <Map center={{ lat, lng }} level={3} className="h-full w-full">
      <MapMarker position={{ lat, lng }}>
        <div className="text-xs">{name}</div>
      </MapMarker>
    </Map>
  );
};

export default DetailMap;
