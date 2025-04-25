export const getMarkerImage = () => {
  return {
    src: "/icons/map/location-dot-solid.svg",
    size: { width: 30, height: 37 },
    options: {
      offset: {
        x: 15, // 아이콘의 중심 또는 원하는 앵커 포인트에 맞게 조정 필요
        y: 37, // 아이콘의 하단에 맞게 조정 필요 (size.height)
      },
    },
  };
};
