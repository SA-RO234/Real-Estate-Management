import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section>
      <Image
        src={
          "https://sokharealestate.com.kh/assets/img/projects/project_3/flat_house_e2/crown_flat_house-retina.jpg"
        }
        alt="hero"
        width={1920}
        height={1080}
        className="object-cover w-full h-full"
      />
    </section>
  );
};

export default Hero;
