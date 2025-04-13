import { useShelters } from "@/hooks/shelter/useShelters";

const ShelterList = () => {
  const { data: shelters = [] } = useShelters();
  return (
    <div className="p-4">
      {/* 대피소 개수 표시 */}
      <p className="mb-3 text-sm text-gray-500">
        내 주변 대피소 {shelters.length}
      </p>

      {/* 대피소 목록 렌더링 */}
      {shelters.map(shelter => (
        <div
          key={shelter.name + shelter.address}
          className="mb-2 flex items-center justify-between p-3"
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
