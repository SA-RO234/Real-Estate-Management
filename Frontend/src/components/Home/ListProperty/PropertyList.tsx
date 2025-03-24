import React from "react";
import { FaPersonShelter } from "react-icons/fa6";
import PropertiesItem from "./PropertiesItem";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PropertyList = () => {
  return (
    <section className="bg-orange-50 p-[100px_0px]">
      <div className="main-title pb-[20px]">
        <div className="flex items-end pb-[5px] justify-center gap-[20px]">
          <FaPersonShelter className="text-[40px] text-blue" />
          <p className="title uppercase text-orage text-[20px] font-bold font-chenla">
            {" "}
            អចលនទ្រព្យទាំងអស់
          </p>
        </div>
        <div className="line w-[220px] h-[2px] bg-blue m-auto"></div>
      </div>
      <h1 className="text-center text-[40px] pb-[50px] font-moul text-orage">
        លក្ខណះអចលនទ្រព្យ
      </h1>
      <div className="property-container w-[85%] gap-[30px] m-auto flex flex-wrap">
        <PropertiesItem />
        <PropertiesItem />
        <PropertiesItem />
        <PropertiesItem />
        <PropertiesItem />
        <PropertiesItem />
        <PropertiesItem />
      </div>
    </section>
  );
};

export default PropertyList;
