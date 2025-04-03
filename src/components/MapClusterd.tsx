"use client";
import useClusteredMarkers from "@/hooks/useClusteredMarkers";

import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

// props 타입 지정
interface MapClusterdProps {
  clusterPositionsData: {
    positions: { lat: number; lng: number }[];
  };
}

const MapClusterd = ({ clusterPositionsData }: MapClusterdProps) => {
  const positions = useClusteredMarkers(clusterPositionsData);

  return (
    <Map
      center={{ lat: 36.2683, lng: 127.6358 }}
      style={{ width: "100%", height: "450px" }}
      level={14}
    >
      <MarkerClusterer averageCenter minLevel={10}>
        {positions.map((pos) => (
          <MapMarker key={`${pos.lat}-${pos.lng}`} position={pos} />
        ))}
      </MarkerClusterer>
    </Map>
  );
};

export default MapClusterd;
