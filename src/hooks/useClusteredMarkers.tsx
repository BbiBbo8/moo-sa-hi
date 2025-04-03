"use client";

import { useEffect, useState } from "react";

interface Position {
  // 좌표 타입 설정
  lat: number; // 위도
  lng: number; // 경도
}

// 클러스터링할 마커들의 위치 데이터를 포함하는 인터페이스
interface ClusterPositionsData {
  positions: Position[];
}

/*
  더미 데이터 추가 (실제 데이터가 없을 경우 기본값으로 사용)
  const dummyClusterData = {
    positions: [
      { lat: 37.5665, lng: 126.978 }, // 서울
      { lat: 35.1796, lng: 129.0756 }, // 부산
      { lat: 37.4563, lng: 126.7052 }, // 인천
    ],
  };
*/

/*
 * useClusteredMarkers 커스텀 훅
 * 주어진 클러스터 위치 데이터를 관리하는 역할을 한다.
 * @param {ClusterPositionsData} clusterPositionsData - 클러스터링할 위치 데이터
 * @returns {Position[]} - 업데이트된 위치 배열 반환
 */
const useClusteredMarkers = (clusterPositionsData: ClusterPositionsData) => {
  // 마커들의 위치 정보를 저장하는 상태 변수
  const [positons, setPositions] = useState<Position[]>([]);

  // 클러스터데이터가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // 클러스터 데이터가 존재하고, positions 속성이 있는 경우 상태를 업데이트
    if (clusterPositionsData && clusterPositionsData.positions) {
      setPositions(clusterPositionsData.positions);
    }
  }, [clusterPositionsData]);
  return positons;
};

export default useClusteredMarkers;
