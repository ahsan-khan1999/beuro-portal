import React from "react";
import ColumnsComp from "./ColumnsComp";

const Templates = () => {
  return (
    <>
      <div className="border border-[#EBEBEB] rounded-md bg-white pl-[32px] pr-[45px] py-3 w-full h-fit flex justify-between items-center">
        <span className="text-base font-medium text-[#4B4B4B]">
          Current PDF Design Templates
        </span>

        <button className="text-white font-medium text-base rounded-lg bg-[#4A13E7] px-[42px] py-2">
          Change
        </button>
      </div>

      <div className="mt-3">
        <ColumnsComp />
      </div>
    </>
  );
};

export default Templates;
