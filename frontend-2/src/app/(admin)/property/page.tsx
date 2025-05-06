"use client";
import { useState, useEffect } from "react";
import { Property } from "../../../lib/types/property";
import { propertyService } from "../../../lib/api/propertyApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getAll();
        setProperties(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load properties");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await propertyService.delete(id);
        setProperties(properties.filter((property) => property.id !== id));
      } catch (err) {
        setError("Failed to delete property");
      }
    }
  };

  if (loading)
    return <div className="text-center p-8">Loading properties...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <Link
          href="/properties/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-2">
                {property.city}, {property.country}
              </p>
              <p className="text-green-600 font-bold mb-2">
                ${Number(property.price).toLocaleString()}
              </p>

              <div className="flex mb-4 text-gray-600 text-sm">
                <div className="mr-4">{property.bedrooms} beds</div>
                <div className="mr-4">{property.bathrooms} baths</div>
                <div>{property.square_feet.toLocaleString()} sq ft</div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {property.description}
              </p>

              <div className="flex justify-end space-x-2 mt-4">
                <Link
                  href={`/property/${property.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View
                </Link>
                <Link
                  href={`/properties/edit/${property.id}`}
                  className="text-green-500 hover:text-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => property.id && handleDelete(property.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center p-8 text-gray-500">No properties found</div>
      )}
    </div>
  );
}
