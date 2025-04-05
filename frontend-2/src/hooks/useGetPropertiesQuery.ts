import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "@/lib/api/api";

export const useGetPropertiesQuery = (page: number = 1, limit: number = 8) => {
  return useQuery({
    queryKey: ["properties", page, limit],
    queryFn: () => fetchProperties(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};
