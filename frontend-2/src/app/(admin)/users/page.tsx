import React from "react";
import {DataTableUsers } from "@/components/common/admin/data-table";
import data from "../dashboard/data.json";
const UsersPage = () => {
  return (
    <div>
      <h2 className="pb-2 text-3xl font- semibold tracking-tight transition-colors">
        Users Management
      </h2>
      <DataTableUsers data={data} />
    </div>
  );
};

export default UsersPage;
