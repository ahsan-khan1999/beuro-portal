import React from "react";

const TableHeadings = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Service
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Created On
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Price
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Description
      </span>

      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md flex justify-center items-center">Edit</span>
      <span className="px-6 py-4  bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeadings;
