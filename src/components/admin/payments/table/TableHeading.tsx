import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(115px,_100%)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Company Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Owner Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Plans
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Pricing
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Payments
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Subscribed at
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Status
      </span>
    </div>
  );
};

export default TableHeading;
