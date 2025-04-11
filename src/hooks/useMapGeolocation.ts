import { useMutation } from "@tanstack/react-query";

// 위치 데이터를 가져오는 비동기 함수
const fetchGeolocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    // 브라우저가 Geolocation API 지원하는지 확인
    if (!navigator.geolocation) {
      reject(new Error("Geolocation을 지원하지 않습니다."));
    } else {
      // 사용자의 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude, // 사용자 위도
            lng: position.coords.longitude, // 사용자 경도
          });
        },
        error => reject(error), // 오류 발생 시 reject 처리
      );
    }
  });
};

// Mutation을 활용한 위치 정보 요청 훅
export const useGeolocationMutation = () => {
  return useMutation({
    mutationFn: fetchGeolocation, // 함수 실행
  });
};
