"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PropertyType } from "@/lib/types";
import { formatPrice } from "@/lib/utils/formatters";
import { Bath, BedDouble, MapPin, Square } from "lucide-react";
import Image from "next/image";
import React from "react";

const PropertyList = ({ properties }: { properties: PropertyType[] }) => {
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
        <a
          href={`/property/${property.id}`}
          key={property.id}
          className="group"
        >
          <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 p-0">
            <div className="relative aspect-video w-full overflow-hidden">
              {property.status?.map((s: string) => (
                <Badge
                  key={s}
                  variant="destructive"
                  className="absolute top-2 right-2 z-10"
                >
                  {s}
                </Badge>
              ))}
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" // Optimize image loading
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">
                  {formatPrice(property.price)}
                </h3>

                <h2
                  className="text-lg font-semibold leading-tight truncate"
                  title={property.title}
                >
                  {property.title}
                </h2>
                {/* Location */}
                <p className="text-sm text-muted-foreground flex gap-1.5 items-center pt-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate" title={property.location}>
                    {property.location}
                  </span>
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t  pb-4">
              {/* Footer details in a flex row */}
              <div className="flex items-center justify-between w-full text-sm text-muted-foreground space-x-3">
                <div
                  className="flex items-center gap-1.5"
                  title={`${property.bedrooms} Bedrooms`}
                >
                  <BedDouble className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {property.bedrooms}{" "}
                    <span className="hidden sm:inline">Beds</span>
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  title={`${property.bathrooms} Bathrooms`}
                >
                  <Bath className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {property.bathrooms}{" "}
                    <span className="hidden sm:inline">Baths</span>
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  title={`${property.length} Sqft`}
                >
                  <Square className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {property.length}{" "}
                    <span className="hidden sm:inline">Sqft</span>
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default PropertyList;
