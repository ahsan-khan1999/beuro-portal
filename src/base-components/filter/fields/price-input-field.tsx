import React from "react";

export const PriceInputField = ({
  label,
  label2,
  lowPrice,
  highPrice,
  onHighPriceChange,
  onLowPriceChange,
}: {
  label: string;
  label2: string;
  lowPrice: string;
  highPrice: string;
  onLowPriceChange: (val: string) => void;
  onHighPriceChange: (val: string) => void;
}) => {
  return (
    <div className="flex items-center  gap-x-3">
      <div>
        <label htmlFor="priceLow" className="text-[#8F8F8F]">
          {label}
        </label>
        <div className=" mt-2">
          <input
            id="priceLow"
            name="number"
            type="number"
            value={lowPrice}
            className="bg-gray-50 border border-lightDark text-lightDark text-sm rounded-lg focus:outline-primary focus:outline block w-[170px] px-5 py-[15px] placeholder:text-lightDark"
            placeholder="0"
            onChange={(e) =>
              onLowPriceChange && onLowPriceChange(e.currentTarget.value)
            }
          />
        </div>
      </div>
      <p className="mt-8">To</p>
      <div>
        <label htmlFor="priceHigh" className="text-[#8F8F8F]">
          {label2}
        </label>
        <div className="mt-2 text-sm">
          <input
            id="priceHigh"
            name="number"
            type="number"
            value={highPrice}
            className="bg-gray-50 border border-lightDark text-lightDark text-sm rounded-lg focus:outline-primary focus:outline block w-[170px]  px-5 py-[15px] placeholder:text-lightDark"
            placeholder="0"
            onChange={(e) =>
              onHighPriceChange && onHighPriceChange(e.currentTarget.value)
            }
          />
        </div>
      </div>
    </div>
  );
};
