"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty } from "../../lib/api/api";

const TABS = [
  "Basic Info",
  "Location",
  "Details",
  "Features",
  "Agent Info",
  "Mortgage",
];

export default function PropertyForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [""],
    price: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      latitude: "",
      longitude: "",
    },
    category: [""],
    bedrooms: "",
    bathrooms: "",
    size: {
      squareFeet: "",
      lotSize: "",
    },
    yearBuilt: "",
    status: [""],
    amenities: [""],
    features: {
      flooring: "",
      kitchen: "",
      heating: "",
      parking: "",
      view: "",
    },
    nearbyPlaces: [""],
    agent: {
      name: "",
      phone: "",
      email: "",
      agency: "",
      profileImage: "",
    },
    listedDate: "",
    propertyId: "",
    hoaFees: "",
    utilitiesIncluded: [""],
    mortgageCalculator: {
      downPayment: "",
      loanTermYears: "",
      interestRate: "",
      estimatedMonthlyPayment: "",
    },
  });

  useEffect(() => {
    if (initialData) setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e, path = []) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      let ref = updated;
      for (let i = 0; i < path.length; i++) {
        ref = ref[path[i]];
      }
      ref[name] = value;
      return updated;
    });
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value.split(",") }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProperty(initialData.id, formData);
      } else {
        await createProperty(formData);
      }
      router.push("/property");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Submission failed");
    }
  };

  const renderTab = () => {
    switch (currentTab) {
      case 0:
        return (
          <>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2"
            />
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2"
            />
            <input
              name="images"
              value={formData.images.join(",")}
              onChange={(e) => handleArrayChange(e, "images")}
              placeholder="Image URLs (comma separated)"
              className="w-full border p-2"
            />
          </>
        );
      case 1:
        return (
          <>
            {Object.entries(formData.location).map(([key, val]) => (
              <input
                key={key}
                name={key}
                value={val}
                onChange={(e) => handleChange(e, ["location"])}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border p-2"
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            <input
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              className="w-full border p-2"
            />
            <input
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              className="w-full border p-2"
            />
            <input
              name="squareFeet"
              value={formData.size.squareFeet}
              onChange={(e) => handleChange(e, ["size"])}
              placeholder="Square Feet"
              className="w-full border p-2"
            />
            <input
              name="lotSize"
              value={formData.size.lotSize}
              onChange={(e) => handleChange(e, ["size"])}
              placeholder="Lot Size"
              className="w-full border p-2"
            />
            <input
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              placeholder="Year Built"
              className="w-full border p-2"
            />
            <input
              name="category"
              value={formData.category.join(",")}
              onChange={(e) => handleArrayChange(e, "category")}
              placeholder="Category (comma separated)"
              className="w-full border p-2"
            />
            <input
              name="status"
              value={formData.status.join(",")}
              onChange={(e) => handleArrayChange(e, "status")}
              placeholder="Status (comma separated)"
              className="w-full border p-2"
            />
          </>
        );
      case 3:
        return (
          <>
            {Object.entries(formData.features).map(([key, val]) => (
              <input
                key={key}
                name={key}
                value={val}
                onChange={(e) => handleChange(e, ["features"])}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border p-2"
              />
            ))}
            <input
              name="amenities"
              value={formData.amenities.join(",")}
              onChange={(e) => handleArrayChange(e, "amenities")}
              placeholder="Amenities (comma separated)"
              className="w-full border p-2"
            />
            <input
              name="nearbyPlaces"
              value={formData.nearbyPlaces.join(",")}
              onChange={(e) => handleArrayChange(e, "nearbyPlaces")}
              placeholder="Nearby Places (comma separated)"
              className="w-full border p-2"
            />
          </>
        );
      case 4:
        return (
          <>
            {Object.entries(formData.agent).map(([key, val]) => (
              <input
                key={key}
                name={key}
                value={val}
                onChange={(e) => handleChange(e, ["agent"])}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border p-2"
              />
            ))}
            <input
              name="listedDate"
              value={formData.listedDate}
              onChange={handleChange}
              placeholder="Listed Date"
              className="w-full border p-2"
            />
            <input
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              placeholder="Property ID"
              className="w-full border p-2"
            />
            <input
              name="hoaFees"
              value={formData.hoaFees}
              onChange={handleChange}
              placeholder="HOA Fees"
              className="w-full border p-2"
            />
            <input
              name="utilitiesIncluded"
              value={formData.utilitiesIncluded.join(",")}
              onChange={(e) => handleArrayChange(e, "utilitiesIncluded")}
              placeholder="Utilities Included (comma separated)"
              className="w-full border p-2"
            />
          </>
        );
      case 5:
        return (
          <>
            {Object.entries(formData.mortgageCalculator).map(([key, val]) => (
              <input
                key={key}
                name={key}
                value={val}
                onChange={(e) => handleChange(e, ["mortgageCalculator"])}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border p-2"
              />
            ))}
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">
        {isEdit ? "Edit Property" : "Add New Property"}
      </h2>

      <div className="flex gap-2 mb-4">
        {TABS.map((tab, idx) => (
          <button
            type="button"
            key={tab}
            onClick={() => setCurrentTab(idx)}
            className={`px-3 py-1 rounded ${
              idx === currentTab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-2">{renderTab()}</div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          disabled={currentTab === 0}
          onClick={() => setCurrentTab((prev) => prev - 1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>
        {currentTab === TABS.length - 1 ? (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Update Property" : "Create Property"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentTab((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
}
