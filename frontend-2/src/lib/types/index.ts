import { StaticImageData } from "next/image";

export interface FeaturedCategoryType {
  title: string;
  quantity: number;
  image?: StaticImageData | string;
}

export interface PropertyType {
  id: number;
  title: string;
  images: string[];
  price: number;
  location: string;
  category: string[];
  bedrooms: number;
  bathrooms: number;
  length: number;
  status: string[];
}

export interface PaginatedPropertiesResponse {
  data: PropertyType[];
  pagiation: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

export enum PropertyStatus {
  ForSale = "For Sale",
  Sold = "Sold",
  Leased = "Leased",
}

export enum Category {
  Apartment = "Apartment",
  House = "House",
  Villa = "Villa",
  Land = "Land",
  Studio = "Studio",
}
