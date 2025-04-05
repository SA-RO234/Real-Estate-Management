import Image from "next/image";
import React from "react";
import PropertyFilter from "./PropertyFilter";

const Hero = () => {
  return (
    <section className="md:h-[700px] h-screen w-full flex items-center justify-center object-cover relative">
      <Image
        src={
          "https://t3.ftcdn.net/jpg/03/44/86/14/360_F_344861474_80Hul52ydDYeg4SlGBNFdrNAsqoIy84w.jpg"
        }
        alt="hero"
        width={1920}
        height={1080}
        className="object-cover w-full h-full "
      />

      <div className="w-full h-full top-0 left-0 bg-black/20 absolute z-1 pointer-events-none"></div>

      <PropertyFilter />
    </section>
  );
};

export default Hero;
