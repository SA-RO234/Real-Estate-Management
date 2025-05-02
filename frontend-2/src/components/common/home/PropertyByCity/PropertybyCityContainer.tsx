import React, { useEffect, useState } from "react";
import { FaPersonShelter } from "react-icons/fa6";
import PropertyItem from "./PropertyItem";
import { fetchPropertyOfEachCity } from "@/lib/api/api";
// import kpc from "../../../assets/City/kpc.png";
// import sr from "../../../assets/City/SR.png";
// import mondulkiri from "../../../assets/City/Mondulkiri.png";
// import pp from "../../../assets/City/PhnomPenh.png";
const PropertybyCityContainer = () => {
   const [CityCategories, setCityCategories] = React.useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    useEffect(() => {
      fetchPropertyOfEachCity()
        .then((data: any) => {
          setCityCategories(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch properties");
          setLoading(false);
        });
    }, []);
  return (
    <section className="w-full">
      <h1 className="text-center text-[50px] font-[800] font-[Poppins,sans-serif]  pb-[50px]">
        Property of each City
      </h1>

      <div className="card-container pb-[50px]  flex overflow-x-scroll gap-[35px] m-auto">
        {CityCategories.map((item, idx) => (
          <PropertyItem
            key={idx}
            Name={item.City}
            Number={item.Count}
            Photo={item.City_image}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertybyCityContainer;
