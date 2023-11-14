import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(250px,_250px)_minmax(300px,_300px)_minmax(150px,_150px)_minmax(80px,_100%)_minmax(100px,_100px)] bg-white rounded-md ">
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Customer Name
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
        Follow Up Date and Time
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
        Subject/Title
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white flex justify-center items-center">
        Status
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Delete
      </span>

      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Details
      </span>
    </div>
  );
};

export default TableHeading;
