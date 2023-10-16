import React from "react";

const TableHeadings = () => {
  return (
    <div className="grid grid-cols-[minmax(120px,_120px),minmax(200px,_100%)_minmax(250px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_100%)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Customer
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Contract Title
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Total Price
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Created on
      </span>
      <span className="px-6 py-4 flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        Payment
      </span>
      <span className="px-6 py-4 flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        Status
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Images
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Notes
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeadings;
