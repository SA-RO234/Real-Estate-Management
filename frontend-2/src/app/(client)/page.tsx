"use client";
import React, { useEffect, useState } from "react";
import HomeForYou from "../../components/common/home/HomeForYou";
import Hero from "../../components/common/home/Hero";
import FeaturedCategories from "../../components/common/home/FeaturedCategories";
import { MessageSquareMore } from "lucide-react";
import MessagesClient from "@/components/common/home/Messages/MessagesClient";
import "../../components/common/home/Hero.scss";
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [OpenBtn, setOpenBtn] = useState(true);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  },[]);

  useEffect(() => {
    if (isModalOpen) {
      setOpenBtn(false);
    } else {
      setOpenBtn(true);
    }
  }, [isModalOpen]);

  return (
    <div className="w-full space-y-16 ">
      <Hero />
      <div className="container mx-auto px-4">
        <FeaturedCategories />
        <HomeForYou />
      </div>
      {/* button for Messages */}
      <MessagesClient
        receiver_id={13}
        sender_id={user?.id}
        username={user?.name}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`${
          OpenBtn ? "block" : "hidden"
        } fixed active:scale-[1.1] duration-[0.5s] cursor-pointer right-[50px] font-extrabold bottom-[50px] text-white  bg-amber-600 scale-[1.9] p-[7px] rounded-full z-50`}
      >
        <MessageSquareMore />
      </button>
    </div>
  );
};

export default HomePage;
