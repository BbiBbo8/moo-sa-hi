export const getImageSrc = (url: string | undefined) => {
  if (typeof url === "string" && url.startsWith("http")) {
    return url;
  }
  return "/shorty.jpeg"; // 기본 이미지
};
