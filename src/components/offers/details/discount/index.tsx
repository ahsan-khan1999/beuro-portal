import React, { useState } from "react";
import Image from "next/image";
import priceTaga from "@/assets/svgs/price_tag.svg";
import calenderIcon from "@/assets/svgs/calender_with_point.svg";
import { OffersDiscountDataTypes } from "@/types/offers";
import { useAppSelector } from "@/hooks/useRedux";
import { formatDateTimeToDate } from "@/utils/utility";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { Button } from "@/base-components/ui/button/button";
import { useTranslation } from "next-i18next";

const Discounts = ({
  handleUpdateDiscount,
}: {
  handleUpdateDiscount: (discount: number) => void;
}) => {
  const { offerActivity, offerDetails } = useAppSelector(
    (state) => state.offer
  );

  const [discount, setDiscount] = useState(offerDetails?.discountAmount);
  //@ts-expect-error
  const discountData: OffersDiscountDataTypes[] | null =
    offerActivity &&
    offerActivity?.discount?.map((item) => ({
      discountTitle: "Price",
      discountPrice: item.totalPrice,
      discountPercentage: item.amount + " " + item.percentage,
      discountDate: formatDateTimeToDate(item?.dateTime),
    }));

  const { t: translate } = useTranslation();

  return (
    <div className="bg-white max-h-[300px] overflow-y-scroll 2xl:min-w-[350px] 2xl:max-w-[350px] w-full">
      {discountData && discountData?.length > 0 ? (
        <div className="flex flex-col rounded-b-lg">
          <div className="flex flex-col gap-[3px] px-5 py-3">
            <span className="text-[#4B4B4B] text-[12px] font-normal">
              {translate("common.discount")}
            </span>
            <div className="flex gap-3">
              <input
                min={0}
                className="text-[#4B4B4B] text-sm font-medium border border-[#C7C7C7] rounded-lg px-2 py-1 w-full focus:border-primary outline-none"
                value={discount}
                onChange={(e: any) => setDiscount(e.target.value)}
              />

              <Button
                className="!h-[30px] !text-[#fff] text-sm font-medium border rounded-md px-3 py-1 w-full"
                id="updateDiscount"
                text={translate("common.update")}
                inputType="button"
                onClick={() => handleUpdateDiscount(discount)}
                // loading={loading}
              />
            </div>
          </div>

          {/* Items from discountData */}
          {discountData?.map((item, index) => (
            <div key={index}>
              <div className="px-5 py-3 flex flex-col gap-[6px]">
                <div className="flex gap-1">
                  <span className="text-[#8F8F8F] font-normal text-sm">
                    {item?.discountTitle}
                  </span>
                  <span className="text-[#4B4B4B] font-normal text-sm">
                    {item?.discountPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex gap-[10px] items-center text-[#4B4B4B] font-normal text-sm">
                    <Image src={priceTaga} alt="priceTaga" />
                    {item?.discountPercentage}
                  </span>
                  <span className="flex gap-[10px] items-center text-[#4B4B4B] font-normal text-sm">
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
        <NoDataEmptyState
          className="w-fit 2xl:w-[270px]"
          containerClassName="py-0 px-2"
        />
      )}
    </div>
  );
};

export default Discounts;
