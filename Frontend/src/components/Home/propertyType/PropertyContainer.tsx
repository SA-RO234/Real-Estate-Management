import Home1 from "../../../assets/propertyType/img1.png";
import Home2 from "../../../assets/propertyType/img2.png";
import Home3 from "../../../assets/propertyType/img3.png";
import Home4 from "../../../assets/propertyType/img4.png";
import Home5 from "../../../assets/propertyType/img5.png";
import Home6 from "../../../assets/propertyType/img6.png";

import PropertyItem from "./PropertyItem";
const PropertyContainer = () => {
  return (
    <div className="w-full inline-flex overflow-x-auto gap-[30px] ">
      <PropertyItem logo={Home2} title={"ផ្ទះប៉ិត"} number={20} />
      <PropertyItem logo={Home1} title={"ផ្ទះកន្តាំង"} number={20} />
      <PropertyItem logo={Home3} title={"ផ្ទះខ្មែរ"} number={20} />
      <PropertyItem logo={Home4} title={"ផ្ទះរោងដោល"} number={20} />
      <PropertyItem logo={Home5} title={"ផ្ទះរោងឌឿង"} number={20} />
      <PropertyItem logo={Home6} title={"ផ្ទះលំហែ"} number={20} />
    </div>
  );
};

export default PropertyContainer;
