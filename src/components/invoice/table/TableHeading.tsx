import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Customer
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Invoice Title
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Total Price
      </span>
      <span className="px-6 py-4  font-medium flex justify-center items-center text-[#8F8F8F] bg-white">
        Email Status
      </span>
      <span className="px-6 py-4  flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        Paid
      </span>
      <span className="px-6 py-4  flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        Status
      </span>

      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Notes
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeading;
