import { useMarkerStore } from "@/store/useMarkerStore";

const ShelterList = () => {
  const checkShelters = useMarkerStore(state => state.checkShelters); // MarkerStore의 저장된 데이터 불러오기

  return (
    <div className="z-50 p-4">
      {/* 대피소 목록 렌더링 */}
      {checkShelters.map(shelter => (
        <div
          key={shelter.name + shelter.address}
          className="mb-2 flex items-center justify-between rounded-lg p-3 hover:bg-gray-200"
        >
          {/* 대피소 이름 및 주소 정보 */}
          <div className="flex flex-col gap-1">
            <h5 className="text-md font-semibold">{shelter.name}</h5>
            <span className="text-xs text-gray-500">{shelter.address}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
