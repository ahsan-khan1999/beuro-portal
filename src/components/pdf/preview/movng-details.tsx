import { MovingDetailsProps } from "@/types/types";
import React from "react";

export const MovingDetails = ({
  header,
  address1,
  address1Details,
  address2,
  address2Details,
  workDates,
}: MovingDetailsProps) => {
  return (
    <>
      <h1 className="text-black text-[20px] font-semibold pb-3 border-b-[3px] mt-5">
        {header}
      </h1>

      <div className="flex gap-x-[30px] pb-2 border-b-2 border-[#8C8C8C] border-opacity-50 mt-2">
        <span>Address 1:</span>
        <span className="text-[#141414] text-base font-normal max-w-[850px]">
          <strong>{address1}</strong> {address1Details}
        </span>
      </div>

      <div className="flex gap-x-[30px] mt-2 pb-2 border-b-2 border-[#8C8C8C] border-opacity-50 ">
        <span>Address 2:</span>
        <span className="text-[#141414] text-base font-normal">
          <strong>{address2}</strong> {address2Details}
        </span>
      </div>

      <div className="flex gap-[20px] mb-[46px] mt-2">
        <span>Work Dates:</span>
        <span className="text-[#000] text-base font-normal">{workDates}</span>
      </div>
    </>
  );
};
