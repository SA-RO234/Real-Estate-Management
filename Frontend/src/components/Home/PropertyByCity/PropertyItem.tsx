import React from "react";
import "./PropertyItem.scss";
interface Item {
    Photo : string,
    Name : string ,
    Number : number;
}
const PropertyItem = ({Photo,Name, Number}:Item) => {
  return (
    <div className="City-item relative cursor-pointer max-w-[350px] min-w-[350px] w-[350px] h-[450px] rounded-[25px] overflow-hidden">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.34)] absolute z-[1]"></div>
      <img src={Photo} className="w-full object-cover h-full" alt="" />
      <h2 className="cityTitle text-[35px] font-medium absolute font-moul left-[30px] text-white top-[40px] z-[100]">
        {Name}
      </h2>
      <p className="number absolute top-[90px] font-chenla left-[30px] text-[20px] z-[100] text-white ">
        <span className="font-bokor">{Number}</span> អចលនទ្រព្យ
      </p>
      <button type="button" className="btn SeeMore">
        See More
      </button>
    </div>
  );
};

export default PropertyItem;
