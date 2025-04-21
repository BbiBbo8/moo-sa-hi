"use client";
import { useMapStore } from "@/store/useMapStore";

const ZoomControl = () => {
  const setLevel = useMapStore(state => state.setLevel);
  const level = useMapStore(state => state.level);

  const handleZoomIn = () => {
    if (level > 1) setLevel(level - 1);
  };

  const handleZoomOut = () => {
    if (level < 14) setLevel(level + 1);
  };

  return (
    <div className="z-40 flex flex-col overflow-hidden rounded-md shadow-md">
      <button
        onClick={handleZoomIn}
        className="flex h-10 w-10 items-center justify-center bg-white"
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="plus-solid">
            <path
              id="Vector"
              d="M10 3.125C10 2.43359 9.44141 1.875 8.75 1.875C8.05859 1.875 7.5 2.43359 7.5 3.125V8.75H1.875C1.18359 8.75 0.625 9.30859 0.625 10C0.625 10.6914 1.18359 11.25 1.875 11.25H7.5V16.875C7.5 17.5664 8.05859 18.125 8.75 18.125C9.44141 18.125 10 17.5664 10 16.875V11.25H15.625C16.3164 11.25 16.875 10.6914 16.875 10C16.875 9.30859 16.3164 8.75 15.625 8.75H10V3.125Z"
              fill="#999999"
            />
          </g>
        </svg>
      </button>
      <button
        onClick={handleZoomOut}
        className="flex h-10 w-10 items-center justify-center border-t-gray-400 bg-white"
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="minus-solid">
            <path
              id="Vector"
              d="M16.875 10C16.875 10.6914 16.3164 11.25 15.625 11.25H1.875C1.18359 11.25 0.625 10.6914 0.625 10C0.625 9.30859 1.18359 8.75 1.875 8.75H15.625C16.3164 8.75 16.875 9.30859 16.875 10Z"
              fill="#999999"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default ZoomControl;
