import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_150px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Logo
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Company Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Customer Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Email
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Plans
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Status
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Login
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeading;
