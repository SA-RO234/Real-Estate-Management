"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import React, { useState } from "react";
import PropertyList from "./PropertyList";
import { homeForYouData } from "@/lib/constants/homeForYouData";
import { PropertyType } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProperties } from "@/lib/api/api";
import { Loader2 } from "lucide-react";
import PaginationControls from "@/components/shared/PaginationControl";

const ITEMS_PER_PAGE = 8;

const HomeForYou = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // --- Tanstack Query ---
  const {
    data: queryResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["properties", page, ITEMS_PER_PAGE],
    queryFn: () => fetchProperties(page, ITEMS_PER_PAGE),
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
  });

  const totalPages = queryResponse?.pagination.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    console.log(`Changing to page ${newPage}`);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);

      // Prefetch next page data
      queryClient.prefetchQuery({
        queryKey: ["properties", newPage, ITEMS_PER_PAGE],
        queryFn: () => fetchProperties(newPage, ITEMS_PER_PAGE),
      });
    }
  };

  //   --- Render Logic ---
  return (
    <section className="w-full">
      <SectionTitle title="Home For You" subTitle="Find your dream home" />
      {/* Loading State (Initial Load) */}
      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {/* Error State */}
      {isError && (
        <div className="text-center text-destructive p-4 rounded-md">
          <p>Error loading properties: {error?.message || "Unknown error"}</p>
        </div>
      )}
      {/* Success State (Render PropertyList) */}
      {!isLoading && !isError && queryResponse?.data && (
        <PropertyList properties={queryResponse.data} />
      )}
      {/* <PropertyList properties={homeForYouData} /> */}
      {/* Empty State (after successful load but no data) */}
      {!isLoading &&
        !isError &&
        (!queryResponse?.data || queryResponse.data.length === 0) && (
          <p className="text-center text-muted-foreground mt-8">
            No properties found for this page.
          </p>
        )}
      {/* Pagination Controls */}
      {/* Only show if successfully loaded and more than one page */}
      {!isLoading && !isError && totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isFetching={isFetching}
        />
      )}{" "}
    </section>
  );
};

export default HomeForYou;
