import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="absolute top-4 left-4"
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
