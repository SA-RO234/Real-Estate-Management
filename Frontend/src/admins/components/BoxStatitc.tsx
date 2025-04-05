import React from "react";

interface Prop {
  title: string;
  Total: string;
  Percentag: string;
  icon: any;
  Text?: string;
}

const BoxStatitc = ({ title, Total, Percentag, icon , Text }: Prop) => {
  return (
    <div className="flex gap-[10px] w-[49%] items-start justify-between p-[25px] rounded-[20px] backdrop-blur-sm bg-black/60">
      <div className="">
        <p className="text-[20px] text-gray-400 font-moul">{title}</p>
        <p className="text-white font-bold font-moul text-[40px]">
          {Total} {Text}
        </p>
        <p className="font-moul text-[35px] font-bold text-green-700 flex items-end">
          +<span className="text-[30px]">{Percentag}</span>%
        </p>
      </div>
      <div className="text-white bg-orage text-[30px] p-[10px] rounded-[10px] w-[50px] h-[50px]">
        {icon}
      </div>
    </div>
  );
};

export default BoxStatitc;
