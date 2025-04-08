import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapGeolocationComponent = ({
  location,
  setCenter,
}: {
  location: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
}) => {
  return (
    <Map
      center={location} // 부모에서 전달 받은 center를 사용
      style={{ width: "100%", height: "350px" }} // 지도 크기 설정
      level={3} // 지도 확대 수준 (1: 최대 확대, 숫자가 클수록 축소)
    >
      <MapMarker
        position={location}
        onClick={() => setCenter(location)} //마커 클릭 시 부모의 center 업데이트
      >
        <div>현재 위치</div>
      </MapMarker>
    </Map>
  );
};

export default MapGeolocationComponent;
