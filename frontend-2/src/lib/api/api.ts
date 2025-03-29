import { PaginatedPropertiesResponse } from "../types/index";

export const fetchProperties = async (
  page: number,
  limit: number
): Promise<PaginatedPropertiesResponse> => {
  // --- Replace with your actual API endpoint ---
  const apiUrl = `/api/properties?page=${page}&limit=${limit}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    // You might want more specific error handling based on status code
    throw new Error(`Failed to fetch properties: ${response.statusText}`);
  }

  const data: PaginatedPropertiesResponse = await response.json();
  return data;
};
