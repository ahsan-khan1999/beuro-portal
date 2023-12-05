import React from "react";

export const Button = () => {
  return (
    <div className="flex gap-5 mt-[30px]">
      <button className="border border-[#C7C7C7] rounded-md bg-white text-base font-medium text-[#1E1E1E] py-[10px] px-4">
        Back
      </button>
      <button className="border border-[#C7C7C7] rounded-md bg-[#4A13E7] text-base font-medium text-[#fff] py-[10px] px-4">
        Send Via Email
      </button>
      <button className="border border-[#C7C7C7] rounded-md bg-[#4A13E7] text-base font-medium text-[#fff] py-[10px] px-4">
        Send Via Post
      </button>
    </div>
  );
};
