import React from "react";

const TableHeading = () => {
  return (
    <div className="grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_200px)_minmax(150px,_150px)_minmax(70px,_70px)]   bg-white rounded-md ">
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white   rounded-md">
        ID
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white  ">
        Recipient
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Subject
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Send at
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white ">
        Viewed at
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white text-center ">
        Status
      </span>
      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white text-center">
        View Mail
      </span>

      <span className="px-6 py-4  font-medium text-[#8F8F8F] bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeading;
