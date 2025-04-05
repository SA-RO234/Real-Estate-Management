import { useQuery } from "@tanstack/react-query";
import { fetchPropertyById } from "@/lib/api/api";

export const useGetPropertyByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id),
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
  });
};
