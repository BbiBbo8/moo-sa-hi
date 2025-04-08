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
      className="w-full h-56 bg-muted flex items-center justify-center rounded-lg cursor-pointer hover:opacity-90 transition"
    >
    </Card>
  );
}