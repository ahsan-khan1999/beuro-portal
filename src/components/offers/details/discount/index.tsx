import React from "react";
import Image from "next/image";
import priceTaga from "@/assets/svgs/price_tag.svg";
import calenderIcon from "@/assets/svgs/calender_with_point.svg";
import { OffersDiscountDataTypes } from "@/types/offers";

const Discounts = () => {
  const discountData: OffersDiscountDataTypes[] = [
    {
      discountTitle: "Price",
      discountPrice: "50000CHF",
      discountPercentage: "20CHF(10%)",
      discountDate: "12/09/2023",
    },
    {
      discountTitle: "Price",
      discountPrice: "50000CHF",
      discountPercentage: "20CHF(10%)",
      discountDate: "12/09/2023",
    },
    {
      discountTitle: "Price",
      discountPrice: "50000CHF",
      discountPercentage: "20CHF(10%)",
      discountDate: "12/09/2023",
    },
    {
      discountTitle: "Price",
      discountPrice: "50000CHF",
      discountPercentage: "20CHF(10%)",
      discountDate: "12/09/2023",
    },
  ];

  return (
    <div className="flex flex-col bg-white rounded-b-lg">
      {/* first item */}
      <div className="flex flex-col gap-[3px] pl-[28px] pr-[21px] py-3">
        <span className="text-[#4B4B4B] text-[12px] font-normal">Discount</span>
        <div className="flex gap-3">
          <span className="text-[#4B4B4B] text-[13px] font-medium border border-[#C7C7C7] rounded-md px-2 py-1 w-full">
            5000CHF
          </span>
          <button className="text-[#fff] text-[13px] font-medium border bg-[#4A13E7] rounded-md px-3 py-1 w-full">
            Update
          </button>
        </div>
      </div>

      <hr className="opacity-20 mx-[11px]" />

      {/* Items from discountData */}
      {discountData.map((item, index) => (
        <div key={index}>
          <div className="pl-[28px] pr-[11px] py-2 flex flex-col gap-[6px]">
            <div className="flex gap-1">
              <span className="text-[#8F8F8F] font-normal text-[13px]">
                {item.discountTitle}
              </span>
              <span className="text-[#4B4B4B] font-normal text-[13px]">
                {item.discountPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="flex gap-[10px] items-center text-[#4B4B4B] font-normal text-[13px]">
                <Image src={priceTaga} alt="priceTaga" />
                {item.discountPercentage}
              </span>
              <span className="flex gap-[10px] items-center text-[#4B4B4B] font-normal text-[13px]">
                <Image src={calenderIcon} alt="calenderIcon" />
                {item.discountDate}
              </span>
            </div>
          </div>
          {index !== discountData.length - 1 && (
            <hr className="opacity-20 mx-[11px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Discounts;
