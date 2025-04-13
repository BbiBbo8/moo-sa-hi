import { Button } from "@/components/ui/button";

const LandingBanner = () => {
  return (
    <section className="relative w-full h-[300px] bg-blue-300 flex flex-col justify-center items-center text-center mx-20px">
      <h1 className="text-3xl font-bold mb-2">빠르고 안전한 대피소 찾기</h1>
      <p>근처의 재난 대피소 정보를 한눈에 확인하세요</p>

      <Button asChild className="text-white bg-blue-600 mt-4">
        <a
          href="https://www.safekorea.go.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          재난안전포털 바로가기
        </a>
      </Button>
    </section>
  );
}

export default LandingBanner;