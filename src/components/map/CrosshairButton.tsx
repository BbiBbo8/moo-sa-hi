import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useMapStore } from "@/store/useMapStore";
import Image from "next/image";

const CrosshairButton = () => {
  // geolocation 훅 가져오기
  const { mutate, isPending } = useGeolocationMutation();
  const setCenter = useMapStore(state => state.setCenter);
  const setLevel = useMapStore(state => state.setLevel);

  // 현재 위치 가져오기
  const handleGetLocation = () => {
    mutate(undefined, {
      onSuccess: data => {
        setCenter(data);
        setLevel(3);
      },
    });
  };
  return (
    <button
      onClick={handleGetLocation}
      disabled={isPending}
      className="absolute bottom-[358px] left-2 z-40 flex h-10 w-10 items-center justify-center rounded-sm bg-white p-1 shadow-md"
    >
      <Image
        src="/icons/crosshairs-solid.png"
        alt="내 위치"
        width={24}
        height={24}
      />
    </button>
  );
};

export default CrosshairButton;
