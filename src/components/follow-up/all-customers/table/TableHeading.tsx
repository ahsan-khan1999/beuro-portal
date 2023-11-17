import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(200px,_200px)_minmax(180px,_180px)_minmax(170px,_170px)_minmax(160px,_160px)_minmax(160px,_160px)] bg-white rounded-md ">
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Name
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
        Email
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
        Phone
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white flex ">
        Created On
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Location
      </span>

      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Type
      </span>
    </div>
  );
};

export default TableHeading;
