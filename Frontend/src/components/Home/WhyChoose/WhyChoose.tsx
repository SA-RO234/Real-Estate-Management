import React from "react";
import { FaPersonShelter } from "react-icons/fa6";
import { RiCheckboxCircleFill } from "react-icons/ri";
import img1 from "../../../assets/Agency/img1.png";
import img2 from "../../../assets/Agency/img2.png";
import multi from "../../../assets/multiProfile.png";
import "./WhyChoose.scss";
const WhyChoose = () => {
  return (
    <section className="bg-white p-[100px_0px] w-[85%] m-auto flex justify-between items-center">
      <div className="block-left w-[45%] flex items-start flex-col">
        <div className="main-title pb-[20px]">
          <div className="flex items-end pb-[5px] justify-center gap-[20px]">
            <FaPersonShelter className="text-[40px] text-blue" />
            <p className="title uppercase text-orage text-[20px] font-bold font-chenla">
              ហេតុអ្វីត្រូវជ្រើសរើសពួកយើង
            </p>
          </div>
          <div className="line w-[220px] h-[2px] bg-blue m-auto"></div>
        </div>
        <h1 className="text-[40px] pb-[20px] font-moul text-orage">
          ពួកយើងនិងស្វែងរកជម្រើសនៃការលក់់ដ៏ល្អសម្រាប់អស់លោកអ្នក
        </h1>
        <p className="text-[22px] font-[500] text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
          sed, sequi dignissimos similique possimus provident cum laboriosam
          culpa quis odio.
        </p>
        <ul className="font-chenla pt-5 flex flex-col gap-3 pb-[40px]">
          <li className="flex items-center  gap-3 text-[20px] text-gray-600 font-bold">
            <RiCheckboxCircleFill className="text-orage" />
            ស្វែងរកការផ្តល់ជូនដែលពិសេសៗ
          </li>
          <li className="flex items-center gap-3 text-[20px] font-bold text-gray-600">
            <RiCheckboxCircleFill className="text-orage" /> មានភាពរស់រាយរាក់ទាក់
            និងផ្ដល់ជូននូវការគាំទ្រដល់ឆាប់រហ័ស
          </li>
          <li className="flex items-center gap-3 text-[20px] text-gray-600 font-bold">
            <RiCheckboxCircleFill className="text-orage " />
            ចុះនូវបញ្ជីអចលនទ្រព្យផ្ទាល់ខ្លួនរបស់លោកអ្នកប្រកបដោយទំនុកចិត្ត
          </li>
        </ul>
        <button type="button" className="btn">
          Read More
        </button>
      </div>
      <div className="block-right relative w-[45%] flex flex-col gap-7">
        <img
          src={img1}
          className="h-[300px] w-full object-cover rounded-[20px]"
          alt=""
        />
        <img
          src={img2}
          className="h-[300px] w-full object-cover rounded-[20px]"
          alt=""
        />

        <div className="allAgency absolute right-[200px] top-[200px] p-[20px_20px] flex justify-center items-center gap-3 flex-col bg-orage rounded-[20px] w-[300px] text-center">
          <h3 className="text-[20px] font-bokor font-bold">
            ភ្នាក់ងាររបស់ពួកយើង​មាន​សរុប​ ៥០នាក់ឡើងទៅ
          </h3>
          <img src={multi} alt="" />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
