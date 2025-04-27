import React from "react";
import { DataTablePerperty } from "@/components/common/admin/data-table";
import data from "../dashboard/data.json";
const PropertyPage = () => {
  return (
    <div>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Property Management
      </h2>
      <DataTablePerperty data={data} />
    </div>
  );
};

export default PropertyPage;
