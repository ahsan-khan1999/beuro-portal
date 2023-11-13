import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(200px,_200px)_minmax(00px,_200px)_minmax(180px,_180px)_minmax(180px,_100%)_minmax(180px,_100%)] bg-white rounded-md ">
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
        Desire Date
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Location
      </span>

      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
        Status
      </span>
    </div>
  );
};

export default TableHeading;
