"use client";
import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import PropertyCard from "../../../components/ui/properties-card";
import { getProperties, deleteProperty } from "../../../lib/api/api";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getProperties();
        setProperties(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load properties");
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter((property) => property.id !== id));
      } catch (err) {
        alert("Failed to delete property");
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <div className="container mx-auto p-6">
          <p className="text-center text-xl">Loading properties...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <div className="container mx-auto p-6">
          <p className="text-center text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  return (
    <div>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Property Management
      </h2>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Properties</h1>
            <Link
              href="/property/create"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add New Property
            </Link>
          </div>

          {properties.length === 0 ? (
            <p className="text-center text-xl py-10">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    title="Delete property"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
