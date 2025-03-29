import { StaticImageData } from "next/image";

export interface FeaturedCategoryType {
  title: string;
  quantity: number;
  image?: StaticImageData | string ;
}
