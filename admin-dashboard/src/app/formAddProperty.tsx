"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty } from "../../lib/api/api";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./formAddProperty.scss";
const TABS = [
  "General",
  "Location",
  "Details",
  "Features",
  "Images",
  "Contact",
];

export default function PropertyForm({ initialData = null }) {
  const router = useRouter();
  //   const isEdit = Boolean(initialData?.id);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [""],
    price: "",
    location: {
      address: "",
      city: "",
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

  //   useEffect(() => {
  //     if (initialData) setFormData((prev) => ({ ...prev, ...initialData }));
  //   }, [initialData]);

  const handleChange = (e: any, path = []) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      let ref = updated;
      for (let i = 0; i < path.length; i++) {
        ref = ref[path[i]];
      }
      //   ref[name] = value;
      return updated;
    });
  };

  //   const handleArrayChange = (e, field) => {
  //     const { value } = e.target;
  //     setFormData((prev) => ({ ...prev, [field]: value.split(",") }));
  //   };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //   if (isEdit) {
      //     await updateProperty(initialData.id, formData);
      //   } else {
      //     await createProperty(formData);
      //   }
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
          <div className="flex flex-wrap justify-between gap-[20px] mb-4 pb-[30px]">
            <div className="block-left w-[47%]">
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                 
                  name="title"
                  required
                  aria-invalid="false"
                  placeholder=""
                  id="title"
                  type="text"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Property Title
                </label>
              </div>
              <div className="property-status flex flex-col gap-2 mt-4">
                <label
                  htmlFor="status"
                  className="after:content-['*'] after:text-red-500"
                >
                  Property For :
                </label>

                <label>
                  <input type="radio" value="rent" name="status"></input>
                  <span>Rent</span>
                </label>
                <label>
                  <input type="radio" value="sale" name="status"></input>
                  <span>Sale</span>
                </label>
                <label>
                  <input type="radio" value="both" name="status"></input>
                  <span>Both</span>
                </label>
              </div>
            </div>

            <div className="block-right w-[47%] flex flex-col gap-[20px]">
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value={formData.price}
                  name="price"
                  required
                  aria-invalid="false"
                  placeholder=""
                  onChange={handleChange}
                  id="salePrice"
                  type="text"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="price"
                >
                  Sale Price
                </label>
              </div>
              {/*  Property Type Select  */}
              <Select>
                <SelectTrigger className="w-full p-[20px_20px] rounded-[10px]">
                  <SelectValue className="" placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel></SelectLabel> */}
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="flatHouse">Flat House</SelectItem>
                    <SelectItem value="offices">Offices</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Property Status */}
              <Select>
                <SelectTrigger className="w-full p-[20px_20px] rounded-[10px]">
                  <SelectValue className="" placeholder="Property Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel></SelectLabel> */}
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pendingApproval">Pending Approval</SelectItem>
                    <SelectItem value="leased">Leased</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                   
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative w-full flex flex-row items-center">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="peer text-black dark:text-white p-4 h-[200px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 outline-0 focus-visible:outline-0 focus-visible:border-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
              ></textarea>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-wrap justify-between gap-[20px] gap-y-[35px] pb-[30px]">
            <div className="[--clr:#1f1f1f] w-[47%] dark:[--clr:#999999] relative flex flex-row items-center">
              <input
                name="address"
                required
                aria-invalid="false"
                placeholder=""
                type="text"
                className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
              />
              <label
                className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                htmlFor="title"
              >
                Property
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex w-full justify-between flex-wrap">
            <div className="left-block w-[48%] flex flex-col gap-y-[35px] flex-wrap">
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value=""
                  name="bedrooms"
                  required
                  aria-invalid="false"
                  placeholder=""
                  id="title"
                  type="text"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text  text-[16px] text-[--clr] inline-block z-0 text-sm mb-px  text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Bedroom
                </label>
              </div>
              {/* Squre Feet  */}
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value=""
                  name="squarefeet"
                  required
                  aria-invalid="false"
                  placeholder=""
                  type="text"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text  text-[16px] text-[--clr] inline-block z-0 text-sm mb-px  text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Square Feet
                </label>
              </div>

              {/*  Year Build */}
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value=""
                  name="yearbuild"
                  required
                  aria-invalid="false"
                  placeholder=""
                  type="number"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text  text-[16px] text-[--clr] inline-block z-0 text-sm mb-px  text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Year Build
                </label>
              </div>
            </div>
            <div className="right-block w-[48%] flex flex-col gap-y-[35px] flex-wrap">
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value=""
                  name="bethroom"
                  required
                  aria-invalid="false"
                  placeholder=""
                  id="bathroom"
                  type="text"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text  text-[16px] text-[--clr] inline-block z-0 text-sm mb-px  text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Bathroom
                </label>
              </div>
              {/*  Lot Size */}
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value=""
                  name="lotsize"
                  required
                  aria-invalid="false"
                  placeholder=""
                  type="text"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text  text-[16px] text-[--clr] inline-block z-0 text-sm mb-px  text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Lot Size
                </label>
              </div>
              {/* Parking */}
              <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
                <input
                  value=""
                  name="parking"
                  required
                  aria-invalid="false"
                  placeholder=""
                  type="number"
                  className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                  className="cursor-text  text-[16px] text-[--clr] inline-block z-0 text-sm mb-px  text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                  htmlFor="title"
                >
                  Parking
                </label>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <>
            {Object.entries(formData.features).map(([key, val]) => (
              <input
                key={key}
                name={key}
                value={val}
                // onChange={(e) => handleChange(e, ["features"])}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border p-2"
              />
            ))}
            <input
              name="amenities"
              value={formData.amenities.join(",")}
              //   onChange={(e) => handleArrayChange(e, "amenities")}
              placeholder="Amenities (comma separated)"
              className="w-full border p-2"
            />
            <input
              name="nearbyPlaces"
              value={formData.nearbyPlaces.join(",")}
              //   onChange={(e) => handleArrayChange(e, "nearbyPlaces")}
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
                // onChange={(e) => handleChange(e, ["agent"])}
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
              //   onChange={(e) => handleArrayChange(e, "utilitiesIncluded")}
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
                // onChange={(e) => handleChange(e, ["mortgageCalculator"])}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border p-2"
              />
            ))}
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-4">
      <div className="flex gap-2 mb-[50px]">
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
            {/* {isEdit ? "Update Property" : "Create Property"} */}
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
