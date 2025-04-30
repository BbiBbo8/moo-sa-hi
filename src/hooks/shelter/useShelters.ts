import { useQuery } from "@tanstack/react-query";
import fetchSheltersApi from "@/app/action/fetchSheltersApi";

export const useShelters = () =>
  useQuery({
    queryKey: ["shelters"],
    queryFn: () => fetchSheltersApi(),
  });
