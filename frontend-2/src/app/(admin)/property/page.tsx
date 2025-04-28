import React from "react";
import PropertyCard from "@/components/common/admin/Properties-card";
import Propertycontainer from "@/components/common/admin/PropertyContainer";
// import data from "../dashboard/data.json";
const PropertyPage = () => {
  return (
    <div>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Property Management
      </h2>
      <Propertycontainer />
    </div>
  );
};

export default PropertyPage;
