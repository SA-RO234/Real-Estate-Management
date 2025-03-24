import React from "react";
import img1 from "../../../assets/KhmerHouses/img6.png";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import sq from "../../../assets/sqr_feet.png";
import { GiHomeGarage } from "react-icons/gi";
import "./PropertyItem.scss";

const PropertiesItem = () => {
  return (
    <div className="propery-Item w-[450px] relative overflow-hidden rounded-[20px] bg-white ">
      <p className="type top-[20px] absolute p-[3px_10px_5px_10px] rounded-[5px] bg-blue text-white font-medium text-[18px] left-[20px]">
        Rent
      </p>
      <img
        src={img1}
        alt=""
        className="photo h-[280px] object-cover cursor-pointer"
      />
      <div className="layer p-[20px_30px]">
        <h1 className="title font-bokor text-[30px]">ផ្ទះលំហែបែបខ្មែរ</h1>
        <p className="location text-[18px] font-bokor text-gray-400 pb-[25px]">
          ភ្នំពេញ, កម្ពុជា
        </p>
        <div className="detail flex justify-start   flex-wrap gap-[20px] w-[90%] font-bokor">
          <div className="item flex gap-2">
            <IoBedOutline className="text-[20px]" /> <span>3</span>បន្ទប់គេង
          </div>
          <div className="item flex gap-2">
            <LiaBathSolid className="text-[20px]" /> <span>4</span>បន្ទប់ទឹក
          </div>
          <div className="item flex gap-2 items-center">
            <img src={sq} className="w-[30px]" alt="" /> <span>750</span>
            ផ្ទៃដីសរុប​
          </div>
          <div className="item flex gap-2 ">
            <GiHomeGarage className="text-[20px]" /> <span>1</span>
            យានដ្ឋានរថយន្ត
          </div>
        </div>
        <div className="line w-full h-[1px] bg-black mt-[10px] mb-[10px]"></div>
        <div className="price_btn flex justify-between pt-[15px]">
          <h3 className="price font-bokor text-[30px] font-bold">
            15000ដុល្លា
          </h3>
          <button type="button" className="btn viewBtn ">
            View Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesItem;
