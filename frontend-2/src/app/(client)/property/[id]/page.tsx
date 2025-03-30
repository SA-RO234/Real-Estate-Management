"use client";

import { Badge } from "@/components/ui/badge"; // Assuming you have Badge
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPropertyByIdQuery } from "@/hooks/useGetPropertyByIdQuery";
import {
  Bath,
  BedDouble,
  ChevronLeft,
  Loader2,
  MapPin,
  Ruler,
  Tag,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatters";

const PropertyDetailPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = typeof params?.id === "string" ? params.id : "";

  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useGetPropertyByIdQuery(id);

  console.log(property);

  if (isLoading) {
    return (
      <section className="container h-[400px] px-4 mx-auto py-16 text-center flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {/* You could replace this with a Skeleton Loader component */}
      </section>
    );
  }

  if (isError) {
    console.error("Error fetching property:", error);
    return (
      <section className="container px-4 mx-auto py-16 text-center text-red-600">
        Error loading property details. Please try again later.
      </section>
    );
  }

  if (!property) {
    return (
      <section className="container px-4 mx-auto py-16 text-center">
        Property not found.
      </section>
    );
  }

  // --- Data Destructuring (optional, but can make code cleaner) ---
  const {
    title,
    images,
    price,
    location,
    category,
    bedrooms,
    bathrooms,
    length,
    status,
  } = property;

  return (
    <section className="container px-4 mx-auto ">
      <header className="py-6">
        <Button variant={"outline"} onClick={() => router.back()}>
          <ChevronLeft /> <span>Back to Listings</span>
        </Button>
      </header>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* --- Image Carousel --- */}
        <div className="w-full">
          {" "}
          {images && images.length > 0 ? (
            <Carousel className="w-full rounded-lg overflow-hidden shadow-md ">
              <CarouselContent>
                {images.map((imageUrl: string, index: number) => (
                  <CarouselItem key={index}>
                    <Card className="p-0">
                      <CardContent className="flex aspect-[16/10]  items-center justify-center p-0 relative">
                        <Image
                          src={imageUrl}
                          alt={`Image ${index + 1} of ${title}`}
                          fill
                          className="object-cover w-full h-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                          priority={index === 0}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground" />
                </>
              )}
            </Carousel>
          ) : (
            // Fallback if no images are available
            <div className="aspect-[16/10] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              No Images Available
            </div>
          )}
        </div>

        {/* --- Property Details --- */}
        <div className="flex flex-col space-y-4 md:pt-4 col-span-1">
          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {title}
          </h1>

          {/* Price */}
          <p className="text-3xl font-semibold text-primary">
            {formatPrice(price)}
          </p>

          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
            <span>{location}</span>
          </div>

          {/* Key Specs (Beds, Baths, Size) */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground pt-2 border-t border-border mt-4">
            {bedrooms > 0 && (
              <div className="flex items-center space-x-2">
                <BedDouble className="h-5 w-5 text-primary" />
                <span>
                  {bedrooms} Bedroom{bedrooms > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {bathrooms > 0 && (
              <div className="flex items-center space-x-2">
                <Bath className="h-5 w-5 text-primary" />
                <span>
                  {bathrooms} Bathroom{bathrooms > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {length > 0 && (
              <div className="flex items-center space-x-2">
                <Ruler className="h-5 w-5 text-primary" />
                {/* Adjust unit as needed (e.g., sq m) */}
                <span>{length} sq ft</span>
              </div>
            )}
          </div>

          {/* Status & Category Badges */}
          <div className="flex flex-wrap gap-2 pt-4">
            {status?.map((s: string) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
            {category?.map((c: string) => (
              <Badge
                key={c}
                variant="outline"
                className="flex items-center gap-1"
              >
                <Tag className="h-3 w-3" /> {c}
              </Badge>
            ))}
          </div>

          {/* Placeholder for Description */}

          {property.description && (
            <div className="pt-4 border-t border-border mt-4">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          )}

          {/* Placeholder for Call to Action Button */}
          <div className="pt-6">
            <Button>Contact Agent / Request Info</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailPage;
