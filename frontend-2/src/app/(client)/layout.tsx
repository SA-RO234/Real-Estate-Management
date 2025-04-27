
import React from "react";
import { Navbar } from "../../components/shared/Navbar";
import { Footer } from "../../components/shared/Footer";
import Hero from "../../components/common/home/Hero";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
