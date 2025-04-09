//더미 데이터
const dummyShelters = [
  {
    id: 1,
    name: "대피소 이름",
    address: "서울특별시 ○○구 ○○동",
    distance: 1.9,
  },
  {
    id: 2,
    name: "서울중앙대피소",
    address: "서울특별시 강남구 역삼동",
    distance: 2.3,
  },
  {
    id: 3,
    name: "서울중앙대피소",
    address: "서울특별시 강남구 역삼동",
    distance: 2.3,
  },
];

const ShelterList = () => {
  return (
    <div className="p-4">
      {/* 대피소 개수 표시 */}
      <p className="mb-3 text-sm text-gray-500">
        내 주변 대피소 {dummyShelters.length}
      </p>

      {/* 대피소 목록 렌더링 */}
      {dummyShelters.map(shelter => (
        <div
          key={shelter.id}
          className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 p-3"
        >
          {/* 대피소 이름 및 주소 정보 */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{shelter.name}</span>
            <span className="text-xs text-gray-500">{shelter.address}</span>
          </div>
          {/* 대피소까지의 거리 */}
          <span className="text-sm text-gray-700">{shelter.distance}km</span>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
