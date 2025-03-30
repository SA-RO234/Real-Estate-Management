import Image from "next/image";
import React from "react";
import PropertyFilter from "./PropertyFilter";

const Hero = () => {
  return (
    <section className="md:h-[600px] h-screen w-full flex items-center justify-center object-cover relative">
      <Image
        src={
          "https://sokharealestate.com.kh/assets/img/projects/project_3/flat_house_e2/crown_flat_house-retina.jpg"
        }
        alt="hero"
        width={1920}
        height={1080}
        className="object-cover w-full h-full "
      />

      <div className="w-full h-full top-0 left-0 bg-black/40 absolute z-1 pointer-events-none"></div>

      <PropertyFilter />
    </section>
  );
};

export default Hero;
