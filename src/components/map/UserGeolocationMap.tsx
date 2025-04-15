import { Map, MapMarker } from "react-kakao-maps-sdk";

const UserGeolocationMap = ({
  location,
  setCenter,
}: {
  location: { lat: number; lng: number } | null;
  setCenter: (center: { lat: number; lng: number }) => void;
}) => {
  if (!location) {
    return;
  }

  return (
    <Map
      center={location}
      style={{ width: "100%", height: "350px" }}
      level={3}
    >
      <MapMarker
        position={location}
        onClick={() => setCenter(location)}
      >
        <div>현재 위치</div>
      </MapMarker>
    </Map>
  );
};

export default UserGeolocationMap;
