"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// Assuming PropertyType is updated to match your new JSON structure
import { PropertyType } from "@/lib/types"; // Make sure this type matches your JSON
import { formatPrice } from "@/lib/utils/formatters"; // Ensure this handles number input
import { Bath, BedDouble, MapPin, Square } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link"; // Use Next.js Link for client-side navigation

// Define a type for the component props, assuming PropertyType is correctly defined elsewhere
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
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        // Use Next.js Link for better navigation
        <Link
          // Use propertyId or id depending on your routing setup. Using id here.
          href={`/property/${property.id}`}
          key={property.propertyId || property.id} // Use propertyId if available, fallback to id
          className="group block h-full" // Ensure link takes full height for clickability
        >
          <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 p-0">
            <div className="relative aspect-video w-full overflow-hidden">
              {/* Display the first status if available */}
              {property.status && property.status.length > 0 && (
                <Badge
                  key={property.status[0]}
                  variant="destructive" // Consider making variant dynamic based on status
                  className="absolute top-2 right-2 z-10"
                >
                  {property.status[0]}
                </Badge>
              )}
              {/* Display the first image if available */}
              {property.images && property.images.length > 0 ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Adjusted sizes slightly
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={properties.indexOf(property) < 3} // Prioritize loading first few images
                />
              ) : (
                // Placeholder if no image is available
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
            <CardContent className="p-4 flex-grow">
              {" "}
              {/* Consistent padding */}
              <div className="space-y-2">
                {/* Access price amount */}
                <h3 className="text-xl font-bold text-primary">
                  {/* Pass amount to formatPrice, maybe currency too if needed */}
                  {property.price ? formatPrice(property.price) : "Price N/A"}
                </h3>

                <h2
                  className="text-lg font-semibold leading-tight truncate"
                  title={property.title} // Tooltip for long titles
                >
                  {property.title}
                </h2>

                {/* Access location address */}
                <p className="text-sm text-muted-foreground flex gap-1.5 items-center pt-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {/* Display address, fallback if not available */}
                  <span
                    className="truncate"
                    title={property.location?.address || "Location N/A"}
                  >
                    {property.location?.address || "Location N/A"}
                  </span>
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t p-4">
              {" "}
              {/* Consistent padding */}
              {/* Footer details */}
              <div className="flex items-center justify-between w-full text-sm text-muted-foreground space-x-3">
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
                  title={`${property.size?.squareFeet ?? "N/A"} Sqft`}
                >
                  <Square className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {property.size?.squareFeet ?? "N/A"}{" "}
                    <span className="hidden sm:inline">Sqft</span>
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PropertyList;
