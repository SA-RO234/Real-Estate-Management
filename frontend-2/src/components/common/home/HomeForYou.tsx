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
import { useGetPropertiesQuery } from "@/hooks/useGetPropertiesQuery";
import PropertybyCityContainer from "./PropertyByCity/PropertybyCityContainer";
import "./HomeForYou.scss";

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
  } = useGetPropertiesQuery(page, ITEMS_PER_PAGE);


  const handleSeeMore = () => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      window.location.href = "/login"; 
    } else {
      window.location.href = "/listing"; 
    }
  };
  

  return (
    <section className="w-[90%] m-[32px_auto] order-2 ">
      <SectionTitle
        title="Newly Developed Condominium Projects in Phnom Penh"
        subTitle="One of the surest ways to grow your money is by investing in pre-construction or under-construction condos. Your investment increases value from the first day you purchase the unit and will continue to appreciate until you decide to sell it. This long-term investment plan is an excellent way to earn passive income. Click here to get all condominium project in Phnom Penh capital Cambodia."
      />
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
        <PropertyList properties={queryResponse.data.slice(0,6)} />
      )}
      {!isLoading &&
        !isError &&
        (!queryResponse?.data || queryResponse.data.length === 0) && (
          <p className="text-center text-muted-foreground mt-8">
            No properties found for this page.
          </p>
        )}
      {!isLoading && !isError &&  (
        <div className="w-[10%] m-[50px_auto]">
          <button className="Show-more" onClick={handleSeeMore}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Show More</span>
          </button>
        </div>
      )}
      <PropertybyCityContainer />
    </section>
  );
};

export default HomeForYou;
