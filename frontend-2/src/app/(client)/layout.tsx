import Hero from "@/components/common/home/Hero";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import React from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="container px-4 mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
