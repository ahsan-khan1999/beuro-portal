import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_200px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Plan Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Description
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Price
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Employs
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Delete
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white "></span>
    </div>
  );
};

export default TableHeading;
