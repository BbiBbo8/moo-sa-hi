export const getImageSrc = (url: string | undefined) => {
  if (typeof url === "string" && url.startsWith("http")) {
    return url;
  }
  return null; // 기본 이미지
};
