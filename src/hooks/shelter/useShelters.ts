import { useQuery } from "@tanstack/react-query";
import { Shelter } from "@/types/shelter";

export const useShelters = (initialData?: Shelter[]) =>
  useQuery<Shelter[]>({
    queryKey: ["shelters"],
    queryFn: async () => {
      const res = await fetch("/api/shelters");
      return res.json();
    },
    initialData,
  });