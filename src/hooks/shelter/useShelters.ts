import { useQuery } from "@tanstack/react-query";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";

export const useShelters = () =>
  useQuery({
    queryKey: ["shelters"],
    queryFn: () => fetchSheltersApi(),
  });
