import React from "react";
import Header from "../components/Header";
import BoxStatitc from "../components/BoxStatitc";
import { IoMdHome } from "react-icons/io";
import { FaHouseLock } from "react-icons/fa6";
import { GiHouse } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import MyComposedChart from "../components/SaleTargetGraph";
import TopAgencybySale from "../components/TopAgencybySale";


const AdminLayout = () => {
  return (
    <div className="w-[75%] absolute right-0 top-0 m-[30px_30px] p-[10px_0px] flex gap-[20px] justify-between flex-wrap ">
      <Header />
      <BoxStatitc icon={<IoMdHome />} title="ចំនួនអចលនទ្រព្យសរុប" Total={"១៥០០"} Percentag={"១៥"} />
      <BoxStatitc icon={<FaHouseLock/>} title="ចំនួនអចលនទ្រព្យសម្រាប់ជួរ" Total={"១៥០​"} Percentag="១០" />
      <BoxStatitc icon={<GiHouse/>} title="ចំនួនអចលនទ្រព្យសម្រាប់លក់" Total="២៥០" Percentag="២៥" />
      <BoxStatitc icon={<RiMoneyDollarCircleFill/>} Text="លានដុល្លា" Percentag="១៥" title="សរុបនៃការលក់"  Total="២៥.៧៨​" />
      <MyComposedChart />
      <TopAgencybySale/>
    </div>
  );
};

export default AdminLayout;
