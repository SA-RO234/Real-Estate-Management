"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { PropertyType } from "@/lib/types";
import { formatPrice } from "@/lib/utils/formatters";
import { Bath, BedDouble, MapPin, Square } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import "./ProductList.scss";
interface PropertyListProps {
  properties: PropertyType[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return (
      <p className="text-center text-muted-foreground col-span-full">
        No properties found.
      </p>
    );
  }

  return (
    <div className="w-full max-w-full cursor-pointer mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, idx) => (
        <Card
          key={idx}
          className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-1 p-0"
        >
          <div className="relative cardImage group aspect-video w-full overflow-hidden">
            <div className="absolute right-[450px] z-[1] top-[-50px] rounded-[20%] group-hover:right-[-250px] duration-[0.5s]  w-[900px] h-[600px] bg-[rgba(255,255,255,0.1)] "></div>
            {property.propertyfor && property.propertyfor.length > 0 && (
              <Badge
                key={property.propertyfor}
                variant="destructive"
                className="absolute top-[25px] p-[1px_15px] bg-red-700 text-[20px] left-[25px] z-10"
              >
                {property.propertyfor}
              </Badge>
            )}
            {/* Display the first image if available */}
            {property.image_url && property.image_url.length > 0 ? (
              <Image
                src={property.image_url}
                alt={property.title}
                fill
                // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Adjusted sizes slightly
                className="object-cover group-hover:scale-[1.1] duration-[0.8s]"
                priority={properties.indexOf(property) < 3} // Prioritize loading first few images
              />
            ) : (
              // Placeholder if no image is available
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
          <CardContent className=" flex-grow">
            <div className="space-y-2">
              <div className="w-full  flex justify-between items-center">
              <h3 className="text-[25px] font-bold text-primary">
                ${property.price ? formatPrice(property.price) : "Price N/A"}
              </h3>
              <Link
                href={`/property/${property.id}`}
                className="flex btnView  w-[180px] h-[50px] justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:h-full  before:duration-700  before:left-[-100%]  before:rounded-full before:bg-black cursor-pointer text-black before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 overflow-hidden border-2 rounded-full group"
              >
                View Property
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-black group-hover:fill-black"
                  ></path>
                </svg>
              </Link>
              </div>
              <h2
                className="text-[25px] font-semibold leading-tight"
                
              >
                {property.title}
              </h2>

              {/* Access location address */}
              <p className="text-sm text-muted-foreground flex gap-1.5 items-center pt-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {/* Display address, fallback if not available */}
                <span className="text-[18px]">
                  {property.city}, {property.country}
                </span>
              </p>
            </div>
          </CardContent>

          <CardFooter className="border-t p-[4px_20px_20px_20px]">
            <div className="flex items-center justify-center gap-[30px] w-full  text-muted-foreground">
              {/* Bedrooms */}
              <div
                className="flex items-center gap-1.5"
                title={`${property.bedrooms ?? "N/A"} Bedrooms`}
              >
                <BedDouble className="w-4 h-4 flex-shrink-0" />
                <span>
                  {property.bedrooms ?? "N/A"}{" "}
                  <span className="hidden sm:inline">Beds</span>
                </span>
              </div>
              {/* Bathrooms */}
              <div
                className="flex items-center gap-1.5"
                title={`${property.bathrooms ?? "N/A"} Bathrooms`}
              >
                <Bath className="w-4 h-4 flex-shrink-0" />
                <span>
                  {property.bathrooms ?? "N/A"}{" "}
                  <span className="hidden sm:inline">Baths</span>
                </span>
              </div>
              {/* Size (Square Feet) - Access nested property */}
              <div
                className="flex items-center gap-1.5"
                title={`${property.square_feet ?? "N/A"} Sqft`}
              >
                <Square className="w-4 h-4 flex-shrink-0" />
                <span>
                  {property.square_feet}
                  <span className="hidden sm:inline">Sqft</span>
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PropertyList;
