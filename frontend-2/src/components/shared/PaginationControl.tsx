"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean; // Optional prop to indicate fetching state
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  isFetching = false, // Default to false
}: PaginationControlsProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1 && !isFetching) {
      // Don't change page while fetching
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages && !isFetching) {
      // Don't change page while fetching
      onPageChange(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 1 || isFetching;
  const isNextDisabled = currentPage === totalPages || isFetching;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            aria-disabled={isPrevDisabled}
            className={
              isPrevDisabled
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Page Indicator (Simple Example) */}
        <PaginationItem>
          <span className="px-4 py-2 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        {/* TODO: Implement more detailed page number links if needed */}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            aria-disabled={isNextDisabled}
            className={
              isNextDisabled
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
