export const getImageSrc = (url: string | undefined) => {
  if (typeof url === "string" && url.startsWith("http")) {
    return url;
  }
  return "/kakao_logo.png"; // 기본 이미지
};
