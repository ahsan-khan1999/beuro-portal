import React, { useState } from "react";
import Image from "next/image";
import priceTaga from "@/assets/svgs/price_tag.svg";
import calenderIcon from "@/assets/svgs/calender_with_point.svg";
import { OffersDiscountDataTypes } from "@/types/offers";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { formatDateTimeToDate } from "@/utils/utility";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { updateOfferDiscount } from "@/api/slices/offer/offerSlice";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { Button } from "@/base-components/ui/button/button";

const Discounts = ({ handleUpdateDiscount }: { handleUpdateDiscount: (discount: number) => void }) => {
  const { offerActivity, offerDetails } = useAppSelector((state) => state.offer);

  const [discount, setDiscount] = useState(offerDetails?.discountAmount)
  const discountData: OffersDiscountDataTypes[] | null =
    offerActivity &&
    offerActivity?.discount?.map((item) => ({
      discountTitle: "Price",
      discountPrice: item.totalPrice,
      discountPercentage: item.amount + " " + item.percentage,
      discountDate: formatDateTimeToDate(item?.dateTime),
    }));




  return (
    <>
      {discountData && discountData?.length > 0 ? (
        <div className="flex flex-col bg-white rounded-b-lg h-[300px] overflow-y-auto">
          {/* first item */}
          <div className="flex flex-col gap-[3px] pl-[28px] pr-[21px] py-3">
            <span className="text-[#4B4B4B] text-[12px] font-normal">Discount</span>
            <div className="flex gap-3">
              <input
                min={0}

                className="text-[#4B4B4B] text-[13px] font-medium border border-[#C7C7C7] rounded-lg px-2 py-1 w-full" value={discount} onChange={(e: any) => setDiscount(e.target.value)} />

              <Button
                className="!h-[30px] !text-[#fff] text-[13px] font-medium border  rounded-md px-3 py-1 w-full"
                id="updateDiscount"
                text="Update"
                inputType="button"
                onClick={() => handleUpdateDiscount(discount)}
              // loading={loading}


              />

            </div>
          </div>

          {/* Items from discountData */}
          {discountData?.map((item, index) => (
            <div key={index}>
              <div className="pl-[28px] pr-[11px] py-2 flex flex-col gap-[6px]">
                <div className="flex gap-1">
                  <span className="text-[#8F8F8F] font-normal text-[13px]">
                    {item?.discountTitle}
                  </span>
                  <span className="text-[#4B4B4B] font-normal text-[13px]">
                    {item?.discountPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex gap-[10px] items-center text-[#4B4B4B] font-normal text-[13px]">
                    <Image src={priceTaga} alt="priceTaga" />
                    {item?.discountPercentage}
                  </span>
                  <span className="flex gap-[10px] items-center text-[#4B4B4B] font-normal text-[13px]">
                    <Image src={calenderIcon} alt="calenderIcon" />
                    {item?.discountDate}
                  </span>
                </div>
              </div>
              {index !== discountData.length - 1 && (
                <hr className="opacity-20 mx-[11px]" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white -mt-6 py-4">
          <NoDataEmptyState />
        </div>
      )}
    </>
  );
};

export default Discounts;
