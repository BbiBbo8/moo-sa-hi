import Image from "next/image";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mr-2" // 왼쪽 공간 확보용
    >
      <Image
        src="./icons/postcreate/chevron-left-solid1.svg"
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}

export default BackButton;
