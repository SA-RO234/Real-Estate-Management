"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyList from "@/components/common/home/PropertyList";
import { fetchAllProperties } from "@/lib/api/api";
const ListingPage = () => {
  const [properties, setProperties] = React.useState([]);
  const [error, setError] = React.useState<string | null>(null);
  useEffect(() => {
    const UserID = typeof window !== "undefined" ? localStorage.getItem("session_id") : null;
    if (!UserID) {
      window.location.href = "/login";
      return;
    }
    fetchAllProperties()
      .then((data) => setProperties(data.data))
      .catch(() => setError("Failed to fetch properties"));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative w-full h-[500px] overflow-hidden rounded-[30px] mb-16">
        <Image
          src="https://res.cloudinary.com/dnfahcxo3/image/upload/v1746551551/333b412d-b694-42f4-9144-974bb6b255a9.png"
          alt="Modern property exterior"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Property Listing
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span>Listing</span>
            </div>
          </div>
        </div>
      </div>
      {/*  Card Property */}
      <div className="w-[85%] m-auto">
        <div className="card-container">
          <PropertyList properties={properties} />
        </div>
        {/*  All Categories */}
        <div className="categories-container"></div>
      </div>
    </div>
  );
};

export default ListingPage;
