import { MovingDetailsProps } from "@/types/types";
import { formatAddress } from "@/utils/utility";
import React from "react";

export const MovingDetails = ({
  header,
  address,
  workDates,
}: MovingDetailsProps) => {
  return (
    <>
      <h1 className="text-black text-[20px] font-semibold pb-3 border-b-[3px] mt-5">
        {header}
      </h1>
      {address?.map((item, index) => (
        <div
          className="flex gap-x-[30px] pb-2 border-b-2 border-[#8C8C8C] border-opacity-50 mt-2"
          key={index}
        >
          <span>Address {++index}:</span>
          <span className="text-[#141414] text-base font-normal max-w-[850px]">
            <strong>
              {formatAddress({
                country: item.country,
                postalCode: item.postalCode,
                streetNumber: item.streetNumber,
              })}
            </strong>{" "}
            {item.description}
          </span>
        </div>
      ))}

      {workDates?.map((item, index) => (
        <div className="flex gap-[20px] mb-[46px] mt-2" key={index}>
          <span>Work Dates:</span>
          <span className="text-[#000] text-base font-normal">
            {item.startDate + " to " + item?.endDate}
          </span>
        </div>
      ))}
    </>
  );
};
