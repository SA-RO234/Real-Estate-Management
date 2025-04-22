import { StaticImageData } from "next/image";

export interface FeaturedCategoryType {
  title: string;
  quantity: number;
  image?: StaticImageData | string;
}

export interface PropertyType {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  city: string;
  country: string;
  category: Category[];
  bedrooms: number;
  bathrooms: number;
  size: {
    squareFeet: number;
    lotSize?: string;
  };
  yearBuilt: number;
  status: PropertyStatus[];
  amenities: string[];
  features: {
    flooring: string;
    kitchen: string;
    heating: string;
    parking: string;
    view?: string;
  };
  nearbyPlaces: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    agency: string;
    profileImage: string;
  };
  listedDate: string;
  propertyId: string;
  hoaFees?: number;
  utilitiesIncluded?: string[];
  mortgageCalculator?: {
    downPayment: number;
    loanTermYears: number;
    interestRate: number;
    estimatedMonthlyPayment: number;
  };
}

// Property Status Enum
export enum PropertyStatus {
  ForSale = "For Sale",
  Sold = "Sold",
  Leased = "Leased",
}

// Category Enum
export enum Category {
  Apartment = "Apartment",
  House = "House",
  Villa = "Villa",
  Land = "Land",
  Studio = "Studio",
}

export interface PaginatedPropertiesResponse {
  data: PropertyType[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
