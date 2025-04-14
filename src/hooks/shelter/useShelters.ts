import { useQuery } from "@tanstack/react-query";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";
import { Shelter } from "@/types/shelter";

export const useShelters = () =>
  useQuery<Shelter[]>({
    queryKey: ["shelters"],
    queryFn: () => fetchSheltersApi(),
  });
