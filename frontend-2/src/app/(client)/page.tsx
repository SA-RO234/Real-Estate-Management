import FeaturedCategories from "@/components/common/home/FeaturedCategories";
import HomeForYou from "@/components/common/home/HomeForYou";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full space-y-16 mt-16">
      <FeaturedCategories />
      <HomeForYou />
    </div>
  );
};

export default HomePage;
