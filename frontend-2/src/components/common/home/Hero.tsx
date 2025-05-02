"use client";
import React, { useEffect, useRef, useState } from "react";
import PropertyFilter from "./PropertyFilter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { fetchPropertyForAd } from "@/lib/api/api";
import "./Hero.scss";

interface Property {
  id: number;
  title: string;
  description: string;
  ad_image_url: string;
  // add other fields as needed
}
const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;


const Hero = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [expanded, setExpanded] = useState<number | null>(null);

  // Create refs for navigation buttons
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetchPropertyForAd()
      .then((data: any) => {
          const sorted = data.sort((a: Property, b: Property) => b.id - a.id);
        setProperties(sorted.slice(0,4));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch properties");
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="md:h-[700px] h-screen w-full flex items-center justify-center object-cover relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {properties.map((item) => (
          <SwiperSlide>
            <div className="relative h-[700px] border text-red-800 w-[95%] m-auto rounded-[30px] overflow-hidden ">
              <img
                src={item.ad_image_url}
                alt=""
                className="w-full absolute z-[-1] h-full"
              />
              <div className="overlay absolute bg-black opacity-[0.4] w-full h-full"></div>
              <div className="title-layer w-[100%] text-white m-auto text-center absolute inset-[100px_0px]">
                <div className="main-title flex items-center justify-center gap-[20px]">
                  <House className="text-white w-[50px] h-[50px]" />
                  <p className=" text-[30px] text-orange-400 underline underline-offset-[10px] font-bold">
                    Welcome to the Kheunh Pteas Haoy!
                  </p>
                </div>
                <h1 className="m-title text-orange-400 text-[70px] w-[100%] font-bold pb-[20px] font-moul pt-[20px]">
                  {item.title}
                </h1>
                <p className="description text-orange-400 pb-[50px] w-[50%] m-auto">
                  {expanded === item.id
                    ? item.description
                    : truncate(item.description, 250)}
                  {item.description.length > 250 && (
                    <button
                      className="ml-2 text-white cursor-pointer "
                      onClick={() =>
                        setExpanded(expanded === item.id ? null : item.id)
                      }
                    >
                      {expanded === item.id ? "Read less" : "Read more"}
                    </button>
                  )}
                </p>
                <div className=" w-[35%] flex items-center justify-between m-auto">
                  <button
                    type="button"
                    className="flex btnView justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:h-full  before:duration-700  before:left-[-100%]  before:rounded-full before:bg-black cursor-pointer text-black before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  >
                    View Property
                    <svg
                      className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                      viewBox="0 0 16 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        className="fill-black group-hover:fill-black"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="relative cursor-pointer bottom-0 flex justify-center items-center gap-2 border border-[#000] rounded-xl text-[#000] font-black bg-gray-50 uppercase px-8 py-4 z-10 overflow-hidden ease-in-out duration-700 group hover:text-[#fff] hover:bg-[#000] active:scale-95 active:duration-0 focus:bg-[#FFF] focus:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700"
                  >
                    <span className="truncate eaes-in-out duration-300 group-active:-translate-x-96 group-focus:translate-x-96">
                      
                      Contact Now
                    </span>
                    <div className="absolute flex flex-row justify-center items-center gap-2 -translate-x-96 eaes-in-out duration-300 group-active:translate-x-0 group-focus:translate-x-0">
                      <div className="animate-spin size-4 border-2 border-[#000] border-t-transparent rounded-full"></div>
                      Processing...
                    </div>
                    <svg
                      className="fill-[#000] group-hover:fill-[#fff] group-hover:-translate-x-0 group-active:translate-x-96 group-active:duration-0 group-focus:translate-x-96 group-focus:fill-[#000] ease-in-out duration-700"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <button
          ref={prevRef}
          type="button"
          className="prevBtn cursor-pointer absolute w-[70px] left-[70px] top-[300px] z-[1000]"
        >
          <ChevronLeft className="text-[150px] font-bold  w-full h-[100px] text-white" />
        </button>
        <button
          ref={nextRef}
          type="button"
          className="nextBtn absolute cursor-pointer w-[70px] h-[100px] left-[1540px] top-[300px] z-[1000]"
        >
          <ChevronRight className="text-[150px] font-bold  w-full h-[100px] text-white" />
        </button>
      </Swiper>
      {/* Filter Option */}
      <PropertyFilter />
    </div>
  );
};

export default Hero;
