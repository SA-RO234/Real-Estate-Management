import React from "react";
import { FaPersonShelter } from "react-icons/fa6";
import PropertyItem from "./PropertyItem";
import kpc from "../../../assets/City/kpc.png";
import sr from "../../../assets/City/SR.png";
import mondulkiri from "../../../assets/City/Mondulkiri.png";
import pp from "../../../assets/City/PhnomPenh.png";
const PropertybyCityContainer = () => {
  return (
    <section className="p-[100px_0px] mt-[100px] bg-orange-50">
      <div className="main-title pb-[20px]">
        <div className="flex items-end pb-[5px] justify-center gap-[20px]">
          <FaPersonShelter className="text-[40px] text-blue" />
          <p className="title uppercase text-orage text-[20px] font-bold font-chenla">
            {" "}
            ទីតាំងតាមទីក្រុងនានា
          </p>
        </div>
        <div className="line w-[220px] h-[2px] bg-blue m-auto"></div>
      </div>
      <h1 className="text-center text-[40px] pb-[50px] font-moul text-orage">
        អចលនទ្រព្យតាមទីក្រុង
      </h1>

      <div className="card-container w-[85%] flex overflow-x-scroll gap-[35px] m-auto">
        <PropertyItem Name="កំពង់ចាម" Number={20} Photo={kpc} />
        <PropertyItem Name="ភ្នំពេញ" Number={50} Photo={pp} />
        <PropertyItem Name="សៀមរាប" Number={40} Photo={sr} />
        <PropertyItem Name="មណ្ឌលគីរី" Number={30} Photo={mondulkiri} />
        <PropertyItem Name="កំពង់ចាម" Number={20} Photo={kpc} />
        <PropertyItem Name="ភ្នំពេញ" Number={50} Photo={pp} />
        <PropertyItem Name="សៀមរាប" Number={40} Photo={sr} />
        <PropertyItem Name="មណ្ឌលគីរី" Number={30} Photo={mondulkiri} />
      </div>
    </section>
  );
};

export default PropertybyCityContainer;
