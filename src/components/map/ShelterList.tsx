import PATH from "@/constants/PATH";
import { useMarkerStore } from "@/store/useMarkerStore";
import Link from "next/link";

const ShelterList = () => {
  const markedShelter = useMarkerStore(state => state.markedShelter); // MarkerStore의 저장된 데이터 불러오기

  return (
    <div className="z-50 p-4">
      {/* 대피소 목록 렌더링 */}
      {markedShelter.map(shelter => (
        <div
          key={shelter.name + shelter.address}
          className="mb-2 flex items-center justify-between p-3"
        >
          {/* 대피소 이름 및 주소 정보 */}
          <Link
            className="flex flex-col gap-1"
            href={`${PATH.MAP}/${shelter.id}`}
          >
            <h5 className="text-md font-semibold">{shelter.name}</h5>
            <span className="text-xs text-gray-500">{shelter.address}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
