"use client";
import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Link from "next/link";
import { fetchPropertyByCategory } from "@/lib/api/api";
import React, { useEffect, useState } from "react";
import "./FeaturedCategories.scss";
const FeaturedCategories = () => {
  const [featuredCategories, setFeaturedCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  useEffect(() => {
    fetchPropertyByCategory()
      .then((data: any) => {
        const sorted = data.sort((a: any, b: any) => b.id - a.id);
        setFeaturedCategories(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch properties");
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full py-[10vh]">
      <SectionTitle
        title="Featured Categories"
        subTitle="Explore our featured categories"
      />

      <ScrollArea className="w-full ">
        <div className="flex justify-center  space-x-4 pb-4 ">
          {featuredCategories.map((feature) => (
            <Link
              key={feature.property_type}
              href={`/category/${feature.property_type}`}
              className="shrink-0 w-[250px]"
            >
              <div className=" overflow-hidden group  relative rounded-md">
                <div className="absolute right-[250px] z-[1] top-[-20px] rounded-[50%] group-hover:right-[-250px] duration-[0.5s]  w-[800px] h-[800px] bg-[rgba(192,189,185,0.2)] "></div>
                <img
                  src={feature.image_url}
                  alt={feature.property_type}
                  className="aspect-[3/4] group-hover:scale-[1.1] duration-[0.8s]  h-fit w-full object-cover"
                  width={400}
                  height={400}
                />
                <div className="pt-2 z-[100] absolute bg-[rgba(0,0,0,0.44)] rounded-[10px] p-4 top-[100px] left-[10px]  text-xs  flex flex-col">
                  <h3 className="font-semibold text-[3em] text-white">
                    {feature.property_type}
                  </h3>
                  <span className="text-white text-[18px]">
                    {feature.count} Properties
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default FeaturedCategories;
