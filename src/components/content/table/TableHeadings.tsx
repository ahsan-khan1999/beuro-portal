import React from "react";

const TableHeadings = () => {
  return (
    <div className="grid grid-cols-[minmax(100px,_100px),minmax(_200px,__200px)_minmax(350px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Name
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white">
        Content Title
      </span>

      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Created On
      </span>

      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md">
        Edit
      </span>
      <span className="px-6 py-4  bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeadings;
