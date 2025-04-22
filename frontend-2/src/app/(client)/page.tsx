
import React from "react";
import HomeForYou from "../../components/common/home/HomeForYou";
import Hero from "../../components/common/home/Hero";
import FeaturedCategories from "../../components/common/home/FeaturedCategories";
const HomePage = () => {
  return (
    <div className="w-full space-y-16 ">
      <Hero />
      <div className="container mx-auto px-4">
        <FeaturedCategories />
        <HomeForYou />
      </div>
    </div>
  );
};

export default HomePage;
