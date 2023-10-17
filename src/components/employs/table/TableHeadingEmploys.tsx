import React from "react";

const TableHeadingServices = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(70px,_150px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Email
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Phone
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Designation
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Created On
      </span>

      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md">Edit</span>
      <span className="px-6 py-4  bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeadingServices;