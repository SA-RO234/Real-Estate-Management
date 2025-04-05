import React from "react";
import { IoNotifications, IoSearch } from "react-icons/io5";
import Profile from "../assets/Profile.png";
import { IoMdSettings } from "react-icons/io";

const Header = () => {
  return (
    <nav className="navbar w-full flex justify-between">
      <div className="block-left">
        <p className="font-moul text-white">
          <span className="text-gray-300">គេហទំព័រ / </span>ផ្ទាំងគ្រប់គ្រង
        </p>
        <p className="font-bold font-moul text-white text-[20px]">
          ផ្ទាំងគ្រប់គ្រង
        </p>
      </div>
      <div className="block-right text-white flex gap-[20px] items-center">
        <div className="search relative">
          <IoSearch className="absolute font-normal left-[10px] h-full top-0 cursor-pointer text-[25px]" />
          <input type="text" name="" id="" placeholder="វាយបញ្ចូលនៅទីនេះ..." className="font-chenla hover:border-white focus:border-orage search focus:p-[10px_400px_10px_45px] duration-[0.5s] outline-none bg-transparent placeholder:font-chenla placeholder:text-[15px] placeholder:text-gray-400 border-2 rounded-[20px] p-[10px_0px_10px_35px] placeholder:p-[0px_5px] border-gray-400" />
        </div>
        <div className="account cursor-pointer flex items-center gap-2">
          <img src={Profile} className="w-[50px] h-[50px] rounded-[100%] object-cover" alt="" />
         <div className="username w-full flex flex-col gap-2"> 
            <p className="font-moul text-[20px]">ស៊ុន រ៉ូ សា</p>
          <div className="w-full h-[3px] bg-white"></div>
          </div> 
        </div>
        <button type="button" className="setting text-[30px]" ><IoMdSettings/></button>
        <button type="button" className="notification text-[30px] relative"><IoNotifications/> <span className="absolute bg-red-700 rounded-full top-[-15px] text-[18px] p-[0px_10px]">5</span> </button>
      </div>
    </nav>
  );
};

export default Header;
