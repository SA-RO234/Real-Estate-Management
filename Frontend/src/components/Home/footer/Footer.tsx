import React from "react";
import logo from "../../../assets/logo.png";
import {
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrMap } from "react-icons/gr";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import "./Footer.scss";
const Footer = () => {
  return (
    <>
      <footer className="bg-orage rounded-[20px] flex gap-[50px] justify-between items-start w-[95%] m-auto p-[100px_100px] ">
        <div className="blockLeft w-[22%]">
          <a
            href="#"
            className="flex  items-end justify-start gap-3  border-orage"
          >
            <img className="w-[100px]" src={logo} alt="" />
          </a>
          <p className="w-[300px] pt-[15px] text-[20px] text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            nostrum praesentium suscipit quos omnis voluptatibus.
          </p>
          <ul className="pt-[10px] flex gap-3">
            <li className="bg-blue rounded-[10px] p-[10px] text-white w-[45px]">
              <a className="text-[25px]" href="#">
                <FaFacebookF />
              </a>
            </li>
            <li className="bg-blue rounded-[10px] p-[10px] text-white w-[45px]">
              <a className="text-[25px]" href="#">
                <FaInstagram />
              </a>
            </li>
            <li className="bg-blue rounded-[10px] p-[10px] text-white w-[45px]">
              <a className="text-[25px]" href="#">
                <FaXTwitter />
              </a>
            </li>
            <li className="bg-blue rounded-[10px] p-[10px] text-white w-[45px]">
              <a className="text-[25px]" href="#">
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
        <div className="blockContact pt-[50px] w-[22%]">
          <h2 className="text-blue text-[30px] pb-[20px] font-moul font-bold">
            ទំនាក់ទំនងពួកយើង
          </h2>
          <ul className="flex flex-col gap-[25px]">
            <li className="font-moul text-white text-[18px] flex items-start gap-4 justify-center">
              <GrMap className="text-[30px]" />
              ផ្លួវជាតិលេខ៦ ស្រុកព្រៃឈរ ខេត្តកំពង់ចាម, ប្រទេសកម្ពុជា
            </li>
            <li className="flex text-white gap-4 font-moul items-center text-[20px] font-bold">
              <TbPhoneCall />
              +855 77 327 539
            </li>
            <li className="flex text-white items-center gap-3 text-[20px] font-medium">
              <HiOutlineMail /> kheunhPteasHuey@gmail.com
            </li>
          </ul>
        </div>
        <div className="QuickLink pt-[50px] w-[22%]">
          <h2 className="text-blue text-[30px] pb-[20px] font-moul font-bold">
            តំណភ្ជាប់រហ័ស
          </h2>
          <ul className="flex flex-col gap-3">
            <li className="text-white flex items-center font-moul gap-3 text-[18px] font-medium">
              <a href="#" className="flex gap-3 items-center">
                <FaChevronRight /> ទំព័រដើម
              </a>
            </li>
            <li className="text-white flex items-center font-moul gap-3 text-[18px]  font-medium">
              <a href="#" className="flex gap-3 items-center">
                <FaChevronRight />
                ចុះបញ្ជី
              </a>
            </li>
            <li className="text-white flex items-center font-moul gap-3 text-[18px]  font-medium">
              <a href="#" className="flex gap-3 items-center">
                <FaChevronRight /> អចលទ្រព្យ
              </a>
            </li>
            <li className="text-white flex items-center font-moul gap-3 text-[18px]  font-medium">
              <a href="#" className="flex gap-3 items-center">
                <FaChevronRight /> ទំនាក់ទំនងពួកយើង
              </a>
            </li>
          </ul>
        </div>
        <div className="Appointment pt-[50px] w-[22%]">
          <h2 className="text-blue text-[30px] pb-[20px] font-moul font-bold">
            ការណាត់ជួប
          </h2>
          <p className="text-white text-[20px] pb-[20px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus,
            ipsa.
          </p>
          <button type="button" className="btn btnAppomtment ">
            កក់ការណាត់ជួប
          </button>
        </div>
      </footer>
      <div className=" flex justify-between pt-[20px] pb-[50px] items-center w-[85%] m-auto">
        <div className="">
          <p className="text-[20px] font-moul">
            រក្សាសិទ្ធិ © ២០២៥ Kheunh Pteas Huey រក្សាសិទ្ធិគ្រប់យ៉ាង
          </p>
        </div>
        <div className="">
          <p className="text-[20px] font-moul">ឯកជនភាព និង គោលការណ៍</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
