import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(100px,_100%)_minmax(100px,_100%)_minmax(120px,_100%)_minmax(120px,_100%)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Customer
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Receipt Title
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Paid Date
      </span>
      <span className="px-6 py-4  font-medium  text-[#8F8F8F] bg-white">
        Amount
      </span>
      <span className="px-6 py-4  flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        Invoice
      </span>
      <span className="px-6 py-4 font-medium text-[#8F8F8F] bg-white ">
        Payment
      </span>

      <span className="px-6 py-4  flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        Email Status
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeading;
