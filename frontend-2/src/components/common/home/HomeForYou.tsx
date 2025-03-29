"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import React, { useState } from "react";
import PropertyList from "./PropertyList";
import { homeForYouData } from "@/lib/constants/homeForYouData";
import { PropertyType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "@/lib/api/api";
import { Loader2 } from "lucide-react";
import PaginationControls from "@/components/shared/PaginationControl";

const ITEMS_PER_PAGE = 8;

const HomeForYou = () => {
  // --- Initial State ---
  const [currentPage, setCurrentPage] = useState(1);

  // --- Tanstack Query ---
  const {
    data: queryResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["properties", currentPage, ITEMS_PER_PAGE],
    queryFn: () => fetchProperties(currentPage, ITEMS_PER_PAGE),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const totalPages = queryResponse?.pagiation.totalPages ?? 1; // Default to 1 if not available

  //   --- Handlers ---
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          // Disable controls while fetching new page data *if* using keepPreviousData
          isFetching={isFetching}
          // Alternative: Always disable when fetching:
          // isFetching={isFetching}
        />
      )}
    </section>
  );
};

export default HomeForYou;
