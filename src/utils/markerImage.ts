export const getMarkerImage = (type: "default" | "selected" = "default") => {
  if (type === "selected") {
    return {
      src: "/icons/map/location-dot-solid.svg",
      size: { width: 30, height: 37 },
      options: {
        offset: {
          x: 20,
          y: 45,
        },
      },
    };
  }
  return undefined;
};
