import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useMapStore } from "@/store/useMapStore";
import Image from "next/image";
import Crosshairs from "public/icons/map/crosshairs-solid.svg";

const CrosshairButton = () => {
  // geolocation 훅 가져오기
  const { mutate, isPending } = useGeolocationMutation();
  const setCenter = useMapStore(state => state.setCenter);
  const setLevel = useMapStore(state => state.setLevel);
  const setCurrentLocation = useMapStore(state => state.setCurrentLocation);

  // 현재 위치 가져오기
  const handleGetLocation = () => {
    mutate(undefined, {
      onSuccess: data => {
        setCenter(data);
        setLevel(7);
        setCurrentLocation(data);
      },
    });
  };
  return (
    <button
      onClick={handleGetLocation}
      disabled={isPending}
      className="z-40 flex h-10 w-10 items-center justify-center rounded-sm bg-white p-1 shadow-md"
    >
      <Image src={Crosshairs} alt="현재위치" width={20} height={20} />
    </button>
  );
};

export default CrosshairButton;
