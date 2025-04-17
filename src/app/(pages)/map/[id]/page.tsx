import ShelterExtraFeature from "@/components/detail/ShelterExtraFeature";
import Link from "next/link";
import React from "react";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";
import DetailMap from "@/components/detail/DetailMap";
import Image from "next/image";

const ShelterDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  // 모든 대피소 가져오기
  const shelters = await fetchSheltersApi();
  //전체 목록중 특정 대피소만 가져오기
  const shelter = shelters.find(s => s.id === id);

  // 지상/지하 매핑
  const FloorType = (code?: string) => {
    if (!code) return "알 수 없음";
    if (code === "1" || code.includes("지하")) return "지하";
    if (code === "2" || code.includes("지상")) return "지상";
    return code;
  };

  // 개방 여부 매핑
  const OpenStatus = (value?: string) => {
    if (value === "Y") return "개방중";
    if (value === "N") return "폐쇄됨";
    return "알 수 없음";
  };

  return (
    <section className="flex flex-col pt-[58px] pb-32">
      {/* 지도 */}
      <div className="bg-accent h-[393px] w-full text-center [&>*]:object-cover">
        {shelter?.lat && shelter?.lng && (
          <DetailMap lat={shelter.lat} lng={shelter.lng} name={shelter.name} />
        )}
      </div>
      <div className="mb-[27px] px-5 pt-5">
        {/* 제목 + 출처 */}
        <header className="mb-4 flex-col">
          <p className="text-left text-xs text-gray-400">행정 안전부 제공</p>
          <h1 className="text-[20px] font-semibold">
            {shelter?.name ?? "정보없음"}
          </h1>
        </header>

        {/* 복사/공유 등 부가 기능 */}
        <aside className="mb-4">
          <ShelterExtraFeature address={shelter?.address} />
        </aside>

        {/* 상세 정보 */}
        <section className="flex w-full flex-col gap-2 text-sm text-[#666666]">
          <p className="flex flex-row items-center gap-1">
            <Image
              src={"/icons/shelter-detail/phone-solid.svg"}
              alt=""
              width={24}
              height={24}
            />
            담당 전화:{" "}
            {shelter?.phone ? (
              <Link href={`tel:${shelter.phone}`} className="text-indigo-500">
                {shelter.phone}
              </Link>
            ) : (
              "정보 없음"
            )}
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image
              src={"/icons/shelter-detail/user-group-solid.svg"}
              alt=""
              width={24}
              height={24}
            />
            수용인원:{" "}
            <span className="text-[#1A1A1A]">
              {shelter?.capacity ?? "정보없음"}명
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image
              src={"/icons/shelter-detail/flag-solid.svg"}
              alt=""
              width={24}
              height={24}
            />
            시설 규모:{" "}
            <span className="text-[#1A1A1A]">
              {shelter?.scale ?? "정보없음"}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image
              src={"/icons/shelter-detail/location-dot-solid.svg"}
              alt=""
              width={24}
              height={24}
            />
            대피 장소:{" "}
            <span className="text-[#1A1A1A]">
              {FloorType(shelter?.locationType ?? "정보없음")}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image
              src={"/icons/shelter-detail/clock-solid.svg"}
              alt=""
              width={24}
              height={24}
            />
            개방 여부:{" "}
            <span className="text-[#1A1A1A]">
              {OpenStatus(shelter?.isOpen ?? "정보없음")}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image
              src={"/icons/shelter-detail/circle-info-solid.svg"}
              alt=""
              width={24}
              height={24}
            />
            평상시 활용유형:{" "}
            <span className="text-[#1A1A1A]">
              {shelter?.usageType ?? "정보없음"}
            </span>
          </p>
        </section>
      </div>

      <div className="mx-5 h-[1px] bg-[#f2f2f2]"></div>

      {/* 신고 안내 */}
      <footer className="flex flex-col gap-2 px-5 pt-2 text-sm text-[#666666]">
        <p>대피소 정보 오류는 행정안전부 콜센터로 제보 바랍니다.</p>
        <p className="text-md">
          행정안전부 콜센터:{" "}
          <Link href={`tel:02-2100-3399`} className="text-indigo-500">
            02-2100-3399
          </Link>
        </p>
      </footer>
    </section>
  );
};

export default ShelterDetailPage;
