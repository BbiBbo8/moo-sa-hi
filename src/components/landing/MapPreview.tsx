"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function LandingMapPreview() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/map");
  };

  return (
    <Card
      onClick={handleClick}
      className="w-full h-56 flex items-center justify-center rounded-lg transition"
    >
    </Card>
  );
}