import React from "react";
import logo from "../../assets/logo.png";
import "./Sidebar.scss";
import { IoHome } from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="fixed sidebar bg w-[20%] font-moul overflow-y-auto backdrop-blur-sm bg-black/60 p-[20px] m-[20px] left-0 top-0 rounded-[20px]">
      <a href="#" className="logo w-full">
        <img src={logo} className="w-[80px] m-auto rounded-md" alt="" />
      </a>
      <div className="line w-full mt-[20px] h-[1px]"></div>
      <ul className="flex flex-col gap-3 w-full pt-[15px]">
        <li className="w-full p-[13px_18px] rounded-[20px] bg-[rgba(0,0,0,0.39)] ">
          <a
            href="#"
            className="flex gap-3 items-center text-[15px] text-white"
          >
            <RiDashboardHorizontalFill className="bg-blue w-[35px] h-[35px] p-[7px] rounded-[10px]" />
            ផ្ទាំងគ្រប់គ្រង
          </a>
        </li>
        <li className="w-full p-[13px_18px] rounded-[20px] bg-[rgba(0,0,0,0.39)] ">
          <a
            href="#"
            className="flex gap-3 items-center text-[15px] text-white"
          >
            <IoHome className="bg-blue w-[35px] h-[35px] p-[7px] rounded-[10px]" />
            អចលនទ្រព្យ
          </a>
        </li>
        <li className="w-full p-[13px_18px] rounded-[20px] bg-[rgba(0,0,0,0.39)] ">
          <a
            href="#"
            className="flex gap-3 items-center text-[15px] text-white"
          >
            <HiUserGroup className="bg-blue w-[35px] h-[35px] p-[7px] rounded-[10px]" />
            ភ្នាក់ងារលក់
          </a>
        </li>
        <li className="w-full p-[13px_18px] rounded-[20px] bg-[rgba(0,0,0,0.39)] ">
          <a
            href="#"
            className="flex gap-3 items-center text-[15px] text-white"
          >
            <MdFavorite className="bg-blue w-[35px]  h-[35px] p-[7px] rounded-[10px]" />
            ចូលចិត្ត
          </a>
        </li>
      </ul>
      <h1 className="text-white text-[20px] p-[20px_18px]">ទំព័រគណនី</h1>
      <ul className="flex flex-col gap-3 w-full">
        <li className="w-full p-[13px_18px] rounded-[20px] bg-[rgba(0,0,0,0.39)] ">
          <a
            href="#"
            className="flex gap-3 items-center text-[15px] text-white"
          >
            <FaUserTie className="bg-blue w-[35px] h-[35px] p-[7px] rounded-[10px]" />
            ប្រវត្តិរូប
          </a>
        </li>
       
        <li className="w-full p-[13px_18px] rounded-[20px] bg-[rgba(0,0,0,0.39)] ">
          <a
            href="#"
            className="flex gap-3 items-center text-[15px] text-red-700"
          >
            <TbLogout2 className="bg-blue w-[35px] h-[35px] p-[7px] rounded-[10px]" />
            ចាកចេញ
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
