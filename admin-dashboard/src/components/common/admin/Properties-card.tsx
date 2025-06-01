import Link from "next/link";
// import Image from "next/image";
import { Property } from "@/app/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative h-48">
        {property.image_url && property.image_url.length > 0 ? (
        <img
          src={property.image_url}
          alt=""
          className="w-full h-full object-cover"
        />
         ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
           </div>
         )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">
          {property.city}, {property.country}
        </p>
        <p className="text-indigo-600 font-bold mb-2">
          ${property.price.toLocaleString()}
        </p>
        <div className="flex text-sm text-gray-600 mb-4">
          <p className="mr-4">
            {property.bedrooms}
            beds
          </p>
          <p className="mr-4">
            {property.bathrooms}
            baths
          </p>
          <p>
            {property.square_feet}
            sq ft
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <Link
            href={`/property/${property.id}`}
            className="text-indigo-600 hover:text-indigo-800"
          >
            View Details
          </Link>
          <Link
            href={`/properties/${property.id}/edit`}
            className="text-green-600 hover:text-green-800"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
