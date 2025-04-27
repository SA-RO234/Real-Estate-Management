"use client";

import PropertyList from "@/components/common/home/PropertyList";
import PropertyImageOverview from "@/components/common/property-detail/PropertyImageOverview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetPropertiesQuery } from "@/hooks/useGetPropertiesQuery";
import { useGetPropertyByIdQuery } from "@/hooks/useGetPropertyByIdQuery";
import { formatPrice } from "@/lib/utils/formatters";
import {
  Bath,
  BedDouble,
  Calendar,
  ChevronLeft,
  Home,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Square,
  Tag,
  Wrench,
  Zap,
  Car,
  Leaf,
  Shield,
  Dumbbell,
  Utensils,
  Eye,
  Snowflake,
  Store,
  Train,
  School,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { JSX } from "react";

// Icon mappings for Features & Nearby Places
const featureIcons: Record<string, JSX.Element> = {
  flooring: <Home className="h-4 w-4 text-primary" />, // Flooring
  kitchen: <Utensils className="h-4 w-4 text-primary" />, // Kitchen
  heating: <Snowflake className="h-4 w-4 text-primary" />, // Heating
  parking: <Car className="h-4 w-4 text-primary" />, // Parking
  view: <Eye className="h-4 w-4 text-primary" />, // View
};

const nearbyIcons: Record<string, JSX.Element> = {
  park: <Leaf className="h-4 w-4 text-primary" />, // Park
  shopping: <Store className="h-4 w-4 text-primary" />, // Shopping
  metro: <Train className="h-4 w-4 text-primary" />, // Metro
  school: <School className="h-4 w-4 text-primary" />, // Schools
};

const PropertyDetailPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // Ensure 'id' is a valid string before passing to the query hook
  const id = typeof params?.id === "string" ? params.id : "";

  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useGetPropertyByIdQuery(id);

  const {
    data: properties,
    isLoading: isLoadingProperties,
    isError: isErrorProperties,
    error: errorProperties,
    isFetching: isFetchingProperties,
  } = useGetPropertiesQuery(1, 6);

  // Loading State
  if (isLoading) {
    return (
      <section className="container h-[400px] px-4 mx-auto py-16 text-center flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  // Error State
  if (isError || (!isLoading && !property && id)) {
    // Also handle case where query finished but found nothing
    console.error("Error fetching property:", error || "Property not found");
    const message = isError
      ? "Error loading property details. Please try again later."
      : "Property not found.";
    return (
      <section className="container px-4 mx-auto py-16 text-center text-destructive">
        {message}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          Go Back
        </Button>
      </section>
    );
  }

  // No property data (might happen if id was invalid from the start)
  if (!property) {
    return (
      <section className="container px-4 mx-auto py-16 text-center">
        Invalid property request.
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          Go Back
        </Button>
      </section>
    );
  }

  // --- Data Destructuring (Using the detailed structure) ---
  const {
    title,
    description,
    images,
    price,
    location,
    category,
    bedrooms,
    bathrooms,
    size,
    status,
    amenities,
    features,
    yearBuilt,
    agent,
    hoaFees,
    utilitiesIncluded,
    nearbyPlaces,
    propertyId,
  } = property;

  return (
    <section className="container px-4 mx-auto pb-16">
      {/* --- Header with Back Button --- */}
      <header className="py-4 mb-4 sticky top-14 bg-background z-20 border-b">
        <Button variant={"outline"} size="sm" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Back to Listings</span>
        </Button>
      </header>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
        {/* --- Column 1: Image Carousel & Key Details --- */}
        <div className="lg:col-span-2 space-y-6  ">
          {/* --- Image Carousel --- */}
          {images && images.length > 0 ? (
            <Carousel className="w-full rounded-lg overflow-hidden">
              <CarouselContent>
                {images.map((imageUrl: string, index: number) => (
                  <CarouselItem key={index}>
                    {/* Removed Card/CardContent wrapper for simplicity within CarouselItem */}
                    <div className="flex aspect-[16/10] items-center justify-center relative bg-muted">
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1} of ${title}`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        priority={index === 0}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        } // Hide broken images
                      />
                      {/* Fallback in case image fails to load */}
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground -z-10">
                        Image {index + 1}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background/90 text-foreground" />
                  <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background/90 text-foreground" />
                </>
              )}
              {/* Status Badge on Image */}
              {status && status.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-3 right-3 z-10"
                >
                  {status[0]}
                </Badge>
              )}
            </Carousel>
          ) : (
            <div className="aspect-[16/10] bg-muted rounded-lg flex items-center justify-center text-muted-foreground shadow-md">
              No Images Available
            </div>
          )}

          <div className="space-y-6">
            {/* --- Description --- */}
            {description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* --- Features --- */}
            {features && Object.keys(features).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {Object.entries(features || {})
                      .filter(
                        ([, value]) =>
                          value !== null && value !== undefined && value !== ""
                      )
                      .map(([key, value]) => {
                        const displayValue =
                          typeof value === "string" || typeof value === "number"
                            ? value
                            : String(value);

                        return (
                          <div key={key} className="flex items-start group">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 transition-colors ">
                              {featureIcons[key] || (
                                <Home className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div>
                              <span className="font-medium capitalize text-foreground block">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </span>
                              <span className="text-muted-foreground">
                                {displayValue}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* --- Amenities --- */}
            {amenities && amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {amenities.map((amenity: string) => {
                      let icon;
                      if (amenity.toLowerCase().includes("pool"))
                        icon = <Leaf />;
                      else if (
                        amenity.toLowerCase().includes("gym") ||
                        amenity.toLowerCase().includes("fitness")
                      )
                        icon = <Dumbbell />;
                      else if (amenity.toLowerCase().includes("security"))
                        icon = <Shield />;
                      else if (amenity.toLowerCase().includes("smart"))
                        icon = <Home />;
                      else icon = <Home />;

                      return (
                        <Badge
                          key={amenity}
                          variant="secondary"
                          className="justify-start px-3 py-2 h-auto text-sm font-normal"
                        >
                          {React.cloneElement(icon, {
                            className: "h-4 w-4 mr-2 text-primary",
                          })}
                          {amenity}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* --- Nearby Places --- */}
            {nearbyPlaces && nearbyPlaces.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Nearby</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nearbyPlaces.map((place: string) => {
                      let icon = (
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                      );
                      Object.entries(nearbyIcons).forEach(([key, ic]) => {
                        if (place.toLowerCase().includes(key)) icon = ic;
                      });

                      return (
                        <div key={place} className="flex items-center group">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0 transition-colors">
                            {icon}
                          </div>
                          <span className="text-muted-foreground">{place}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* --- Column 2: Core Info & Agent --- */}
        <div className="lg:col-span-1 p-4 md:sticky md:top-24 md:max-h-[calc(110vh-8rem)] md:p-1">
          <ScrollArea className="h-full w-full ">
            {/* --- Title & Location --- */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl leading-tight">
                {title}
              </h1>
              {/* Location */}
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                {/* Accessing nested location properties */}
                <span>{location?.address || "Address not available"}</span>
              </div>
            </div>
            {/* --- Price --- */}
            <p className="text-3xl font-semibold text-primary pt-2">
              {/* Ensure formatPrice handles the number correctly */}
              {price != null ? formatPrice(price) : "Price not listed"}
            </p>
            {/* --- Key Specs --- */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground pt-4 border-t border-border">
              {bedrooms != null && bedrooms > 0 && (
                <div
                  className="flex items-center space-x-2"
                  title={`${bedrooms} Bedrooms`}
                >
                  <BedDouble className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>
                    {bedrooms} Bed{bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {bathrooms != null && bathrooms > 0 && (
                <div
                  className="flex items-center space-x-2"
                  title={`${bathrooms} Bathrooms`}
                >
                  <Bath className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>
                    {bathrooms} Bath{bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {/* Using size.squareFeet */}
              {size?.squareFeet != null && size.squareFeet > 0 && (
                <div
                  className="flex items-center space-x-2"
                  title={`${size.squareFeet} Square Feet`}
                >
                  {/* Changed Icon */}
                  <Square className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{size.squareFeet.toLocaleString()} sq ft</span>
                </div>
              )}
              {yearBuilt && (
                <div
                  className="flex items-center space-x-2"
                  title={`Year Built: ${yearBuilt}`}
                >
                  <Wrench className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Built {yearBuilt}</span>
                </div>
              )}
            </div>
            {/* --- Status & Category Badges --- */}
            <div className="flex flex-wrap gap-2 pt-4">
              {/* Show only first status if multiple exist for brevity here, or keep map */}
              {status && status.length > 0 && (
                <Badge
                  key={status[0]}
                  variant="secondary"
                  className="text-base"
                >
                  {status[0]}
                </Badge>
              )}
              {category?.map((c: string) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" /> {c}
                </Badge>
              ))}
              {propertyId && (
                <Badge variant="outline" className="font-mono text-xs">
                  ID: {propertyId}
                </Badge>
              )}
            </div>
            {/* --- HOA & Utilities --- */}
            {(hoaFees != null ||
              (utilitiesIncluded && utilitiesIncluded.length > 0)) && (
              <div className="pt-4 border-t mt-4 space-y-2 text-sm text-muted-foreground">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Additional Info
                </h3>
                {hoaFees != null && hoaFees > 0 && (
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>HOA Fees: {formatPrice(hoaFees)} / month</span>{" "}
                    {/* Assuming monthly */}
                  </div>
                )}
                {utilitiesIncluded && utilitiesIncluded.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>
                      Utilities Included: {utilitiesIncluded.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            )}
            {/* --- Agent Info & CTA --- */}
            <div className="pt-6 border-t mt-6">
              {agent ? (
                <Card className="w-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">
                      Contact Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-14 w-14 border">
                          <AvatarImage
                            src={agent.profileImage}
                            alt={agent.name || "Agent"}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {agent.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("") || "AG"}
                          </AvatarFallback>
                        </Avatar>
                        {agent.isOnline && (
                          <Badge
                            variant="outline"
                            className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background bg-emerald-500 p-0"
                          >
                            <span className="sr-only">Online</span>
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium leading-none">
                          {agent.name || "Listing Agent"}
                        </h3>
                        {agent.agency && (
                          <p className="text-sm text-muted-foreground">
                            {agent.agency}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            5.0 ★ (42 reviews)
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            Premier Agent
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-2">
                      {agent.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{agent.phone}</span>
                        </div>
                      )}
                      {agent.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{agent.email}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Tour
                    </Button>
                    <Button variant="outline" className="w-full">
                      Request Information
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Button className="w-full">Contact Us For Info</Button>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Images Overview */}
      {/* <PropertyImageOverview images={images} /> */}

      {/* Explore More */}
      <h2 className="text-2xl font-bold mt-12">Explore More</h2>

      {/* Loading */}
      {isLoadingProperties && (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error */}
      {isErrorProperties && (
        <div className="text-center text-destructive p-4 rounded-md">
          <p>
            Error loading properties:{" "}
            {errorProperties?.message || "Unknown error"}
          </p>
        </div>
      )}
      {/* Property List */}
      {properties && properties.data && properties.data.length > 0 && (
        <div className="mt-6">
          <PropertyList properties={properties.data} />
        </div>
      )}
    </section>
  );
};

export default PropertyDetailPage;
