import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useMapStore } from "@/store/useMapStore";

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
        setLevel(3);
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
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="crosshairs-solid" clipPath="url(#clip0_1426_894)">
          <path
            id="Vector"
            d="M10 0C10.6914 0 11.25 0.558594 11.25 1.25V1.65625C14.9102 2.19922 17.8008 5.09375 18.3438 8.75H18.75C19.4414 8.75 20 9.30859 20 10C20 10.6914 19.4414 11.25 18.75 11.25H18.3438C17.8008 14.9102 14.9062 17.8008 11.25 18.3438V18.75C11.25 19.4414 10.6914 20 10 20C9.30859 20 8.75 19.4414 8.75 18.75V18.3438C5.08984 17.8008 2.19922 14.9102 1.65625 11.25H1.25C0.558594 11.25 0 10.6914 0 10C0 9.30859 0.558594 8.75 1.25 8.75H1.65625C2.19922 5.08984 5.08984 2.19922 8.75 1.65625V1.25C8.75 0.558594 9.30859 0 10 0ZM4.19531 11.25C4.68359 13.5273 6.47656 15.3164 8.75 15.8047V15C8.75 14.3086 9.30859 13.75 10 13.75C10.6914 13.75 11.25 14.3086 11.25 15V15.8047C13.5273 15.3164 15.3164 13.5234 15.8047 11.25H15C14.3086 11.25 13.75 10.6914 13.75 10C13.75 9.30859 14.3086 8.75 15 8.75H15.8047C15.3164 6.47266 13.5273 4.68359 11.25 4.19531V5C11.25 5.69141 10.6914 6.25 10 6.25C9.30859 6.25 8.75 5.69141 8.75 5V4.19531C6.47266 4.68359 4.68359 6.47266 4.19531 8.75H5C5.69141 8.75 6.25 9.30859 6.25 10C6.25 10.6914 5.69141 11.25 5 11.25H4.19531ZM10 8.75C10.3315 8.75 10.6495 8.8817 10.8839 9.11612C11.1183 9.35054 11.25 9.66848 11.25 10C11.25 10.3315 11.1183 10.6495 10.8839 10.8839C10.6495 11.1183 10.3315 11.25 10 11.25C9.66848 11.25 9.35054 11.1183 9.11612 10.8839C8.8817 10.6495 8.75 10.3315 8.75 10C8.75 9.66848 8.8817 9.35054 9.11612 9.11612C9.35054 8.8817 9.66848 8.75 10 8.75Z"
            fill="#999999"
          />
        </g>
        <defs>
          <clipPath id="clip0_1426_894">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

export default CrosshairButton;
