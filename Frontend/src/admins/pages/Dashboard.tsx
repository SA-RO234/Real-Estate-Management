import React from "react";
import Sidebar from "../components/Sidebar";
import AdminLayout from "../layouts/AdminLayout";

const Dashboard = () => {
  return (
    <div className="relative overflow-hidden h-[100vh] overflow-y-auto w-full bg-gradient-to-r from-orage to-blue">
      <Sidebar />
      <AdminLayout />
    </div>
  );
};

export default Dashboard;
