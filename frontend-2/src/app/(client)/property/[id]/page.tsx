"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Property } from "../../../../lib/types/property";
import { propertyService } from "../../../../lib/api/propertyApi";
import Link from "next/link";
import Image from "next/image";
import {
  Bed,
  Bath,
  Home,
  Ruler,
  Calendar,
  Tag,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  ArrowLeft,
  Heart,
  Share,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function PropertyDetail() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const id = pathname?.split("/").pop();

  // Mock images for the gallery (replace with actual property images)
  const mockImages = [
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const data = await propertyService.getById(id);
        setProperty(data);
      } catch (err) {
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    if (!property || !property.id) return;

    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await propertyService.delete(property.id);
        router.push("/properties");
      } catch (err) {
        setError("Failed to delete property");
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === mockImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? mockImages.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse text-xl">Loading property details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="text-xl">Property not found</div>
        <Button asChild>
          <Link href="/property">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/property">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
      </div>

      {/* Property Title and Price */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {property.city}, {property.country}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="text-2xl md:text-3xl font-bold text-green-600">
              ${Number(property.price).toLocaleString()}
            </div>
            <Badge
              className="mt-1"
              variant={property.status === "For Sale" ? "default" : "secondary"}
            >
              {property.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <div className="aspect-[16/9] relative">
          <Image
            src={mockImages[currentImageIndex] || "/placeholder.svg"}
            alt={`Property image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {mockImages.length}
          </div>
        </div>
        <div className="flex mt-2 gap-2 overflow-x-auto pb-2">
          {mockImages.map((img, index) => (
            <div
              key={index}
              className={`relative h-16 w-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="pt-6">
                  {/* Key Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Bed className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-lg font-semibold">
                        {property.bedrooms}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Bedrooms
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Bath className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-lg font-semibold">
                        {property.bathrooms}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Bathrooms
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Home className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-lg font-semibold">
                        {property.square_feet?.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Sq Ft
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Ruler className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-lg font-semibold">
                        {property.lot_size}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Lot Size
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>

                  {/* Property Features */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3">
                      Property Features
                    </h2>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Year Built: {property.year_built}
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        HOA Fees: ${property.hoa_fees}/month
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Listed: {property.listed_date}
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Property Type: Single Family
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Parking: 2 Car Garage
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Cooling: Central Air
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Interior Details
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Bedrooms: {property.bedrooms}
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Bathrooms: {property.bathrooms}
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Interior Size:{" "}
                          {property.square_feet?.toLocaleString()} sq ft
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Appliances: Refrigerator, Dishwasher, Oven
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Flooring: Hardwood, Tile
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Exterior Details
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Lot Size: {property.lot_size}
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Year Built: {property.year_built}
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Roof: Asphalt Shingle
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Construction: Wood Frame
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          Parking: 2 Car Garage
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      Map view placeholder
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Location Details
                    </h3>
                    <p className="mb-4">
                      {property.city}, {property.country}
                    </p>
                    <h4 className="font-medium mb-2">Nearby Amenities</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Schools: 0.5 miles
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Shopping: 1.2 miles
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Parks: 0.8 miles
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        Public Transit: 0.3 miles
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Admin Actions */}
          <div className="mt-8 flex gap-4">
            <Button asChild variant="outline">
              <Link href={`/properties/edit/${property.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Property
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Property
            </Button>
          </div>
        </div>

        {/* Right Column - Contact and Similar   */}
        <div>
          {/* Contact Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
              <div className="flex items-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.pexels.com/photos/10412892/pexels-photo-10412892.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Agent"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">John Smith</h4>
                  <p className="text-sm text-muted-foreground">
                    Real Estate Agent
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Agent
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col h-auto py-3">
                  <Heart className="h-5 w-5 mb-1" />
                  <span className="text-xs">Save</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-3">
                  <Share className="h-5 w-5 mb-1" />
                  <span className="text-xs">Share</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-3">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">Tour</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-3">
                  <Tag className="h-5 w-5 mb-1" />
                  <span className="text-xs">Offer</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Similar Properties */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="relative h-20 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt={`Similar property ${item}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">
                        Beautiful Home in {property.city}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {property.bedrooms} bd | {property.bathrooms} ba |{" "}
                        {property.square_feet?.toLocaleString()} sqft
                      </p>
                      <p className="text-sm font-semibold">
                        ${(Number(property.price) * 0.9).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
