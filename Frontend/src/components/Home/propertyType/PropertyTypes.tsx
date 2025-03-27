import { FaPersonShelter } from "react-icons/fa6";
import PropertyContainer from "./PropertyContainer";


const PropertyTypes = () => {
  return (
    <section className="p-[100px_0px] container m-auto overflow-hidden">
      <div className="main-title pb-[20px]">
        <div className="flex items-end pb-[5px] justify-center gap-[20px]">
          <FaPersonShelter className="text-[40px] text-blue" />
          <p className="title uppercase text-orage text-[20px] font-bold font-chenla">
            {" "}
            ប្រភេទអចលនទ្រព្យ
          </p>
        </div>
        <div className="line w-[220px] h-[2px] bg-blue m-auto"></div>
      </div>
      <h1 className="text-center text-[40px] pb-[50px] font-moul text-orage">
        ស្វែងរកនូវប្រភេទផ្ទះ
      </h1>
    <PropertyContainer/>
    </section>
  );
};

export default PropertyTypes;
