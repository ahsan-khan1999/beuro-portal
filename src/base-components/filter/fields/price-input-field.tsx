import React from "react";

export const PriceInputField = ({
  label,
  label2,
  onHighPriceChange,
  onLowPriceChange,
}: {
  label: string;
  label2: string;
  onLowPriceChange: (val: string) => void;
  onHighPriceChange: (val: string) => void;
}) => {
  return (
    <div className="flex items-center  gap-x-3">
      <div>
        <label htmlFor="number" className="text-[#8F8F8F]">
          {label}
        </label>
        <div className=" mt-2">
          <input
            id="number"
            name="number"
            type="number"
            className="bg-gray-50 border border-lightDark text-lightDark text-sm rounded-lg focus:outline-primary focus:outline block w-[170px] px-5 py-[15px] placeholder:text-lightDark"
            placeholder="0"
            onChange={(e) => onLowPriceChange(e.currentTarget.value)}
          />
        </div>
      </div>
      <p className="mt-8">To</p>
      <div>
        <label htmlFor="number" className="text-[#8F8F8F]">
          {label2}
        </label>
        <div className="mt-2 text-sm">
          <input
            id="number"
            name="number"
            type="number"
            className="bg-gray-50 border border-lightDark text-lightDark text-sm rounded-lg focus:outline-primary focus:outline block w-[170px]  px-5 py-[15px] placeholder:text-lightDark"
            placeholder="0"
            onChange={(e) => onHighPriceChange(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};
