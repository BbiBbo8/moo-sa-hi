import ShelterExtraFeature from "@/components/detail/ShelterExtraFeature";
import Link from "next/link";
import React from "react";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";
import DetailMap from "@/components/detail/DetailMap";
import Image from "next/image";
import phone from "public/icons/shelter-detail/phone-solid.svg";
import user from "public/icons/shelter-detail/user-group-solid.svg";
import flag from "public/icons/shelter-detail/flag-solid.svg";
import locationDot from "public/icons/shelter-detail/location-dot-solid.svg";
import clock from "public/icons/shelter-detail/clock-solid.svg";
import info from "public/icons/shelter-detail/circle-info-solid.svg";

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
    <section className="mx-auto flex w-full max-w-[640px] min-w-[320px] flex-col items-center justify-center pt-[58px] pb-15">
      {/* 지도 */}
      <div className="bg-accent mx-auto aspect-1/1 w-full max-w-[640px] min-w-[320px] text-center [&>*]:object-cover">
        {shelter?.lat && shelter?.lng && (
          <DetailMap lat={shelter.lat} lng={shelter.lng} name={shelter.name} />
        )}
      </div>
      <div className="w-full px-5 pt-5">
        {/* 복사/공유 등 부가 기능 */}
        <aside className="mb-4">
          <ShelterExtraFeature
            address={shelter?.address}
            name={shelter?.name}
          />
        </aside>

        {/* 상세 정보 */}
        <section className="text-numEng flex w-full flex-col gap-2 text-gray-600">
          <p className="flex flex-row items-center gap-1">
            <Image src={phone} alt="" width={24} height={24} />
            담당 전화:{" "}
            {shelter?.phone ? (
              <Link
                href={`tel:${shelter.phone}`}
                className="text-indigo-500 underline underline-offset-3"
              >
                {shelter.phone}
              </Link>
            ) : (
              "정보 없음"
            )}
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image src={user} alt="" width={24} height={24} />
            수용인원:{" "}
            <span className="text-[#1A1A1A]">
              {shelter?.capacity ?? "정보없음"}명
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image src={flag} alt="" width={24} height={24} />
            시설 규모:{" "}
            <span className="text-[#1A1A1A]">
              {shelter?.scale ?? "정보없음"}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image src={locationDot} alt="" width={24} height={24} />
            대피 장소:{" "}
            <span className="text-[#1A1A1A]">
              {FloorType(shelter?.locationType ?? "정보없음")}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image src={clock} alt="" width={24} height={24} />
            개방 여부:{" "}
            <span className="text-[#1A1A1A]">
              {OpenStatus(shelter?.isOpen ?? "정보없음")}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image src={info} alt="" width={24} height={24} />
            평상시 활용유형:{" "}
            <span className="text-[#1A1A1A]">
              {shelter?.usageType ?? "정보없음"}
            </span>
          </p>
          <span className="text-bodyS w-full text-right text-gray-400">
            행정안전부 제공
          </span>
        </section>
      </div>

      <div className="mx-5 my-5 h-[1px] w-full bg-gray-50" />

      {/* 신고 안내 */}
      <footer className="flex flex-col gap-2 px-5 pt-2 text-sm text-gray-600">
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
