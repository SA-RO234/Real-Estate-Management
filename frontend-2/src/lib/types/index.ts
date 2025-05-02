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
  image_url: string;
  imageForAd: number;
  price: number;
  city: string;
  country: string;
  category: Category[];
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  lotSize?: string;
  yearBuilt: number;
  propertyfor: PropertyStatus;
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

//  User

export interface UsersRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

//  Propety Card  ( Dashboard )

export interface Property {
  id: number;
  title: string;
  image_url: string;
  city: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
}
