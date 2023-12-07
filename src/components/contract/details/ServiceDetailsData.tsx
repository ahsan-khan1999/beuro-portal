import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { contractTableTypes } from "@/types/contract";
import { useTranslation } from "next-i18next";
import React from "react";

const ServiceDetailsData = ({ contractDetails }: { contractDetails: contractTableTypes }) => {

  const { t: translate } = useTranslation();
  return (
    <div className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit" id="Service Details">
      <h2 className="text-[#393939] text-lg font-medium">
        {translate("contracts.service_details.heading")}
      </h2>

      <hr className="opacity-20 my-6" />

      <div className="mt-5">
        <div className="grid grid-cols-[minmax(250px,_100%)_minmax(300px,_100%)_minmax(130px,_100%)_minmax(80px,_100%)_minmax(80px,_100%)_minmax(92px,_92px)] mb-[28px]">
          <span className="text-[14px] font-medium text-[#8F8F8F]">
            {translate("contracts.service_details.title")}
          </span>
          <span className="text-[14px] font-medium text-[#8F8F8F]">
            {translate("contracts.service_details.description")}
          </span>

          <span>{translate("contracts.service_details.price")}</span>
          <span> {translate("contracts.service_details.unit")}</span>
          <span> {translate("contracts.service_details.count")}</span>
          <span>{translate("contracts.service_details.total_price")}</span>
        </div>

        {contractDetails?.offerID?.serviceDetail?.serviceDetail.map((item, index) => (
          <div
            className="grid grid-cols-[minmax(250px,_100%)_minmax(300px,_100%)_minmax(130px,_100%)_minmax(80px,_100%)_minmax(80px,_100%)_minmax(92px,_92px)]  mb-[18px] text-[14px] font-medium text-[#4B4B4B]"
            key={index}
          >
            <span>{item.serviceTitle}</span>
            <span>{item.description}</span>

            <span>{item.price}</span>
            <span> {item.unit}</span>
            <span> {item.count}</span>
            <span> {item.totalPrice}</span>
          </div>
        ))}
      </div>
      <hr className="opacity-20 mt-[40px]" />

      <div className="mt-5 border float-right border-[#EBEBEB] rounded-lg w-fit p-5">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-2 border-r-[2px] border-r-[#EBEBEB]">
            <span className="text-[#4D4D4D] text-[14px] font-normal">
              {translate("contracts.service_details.sub_total")}
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {contractDetails?.offerID?.subTotal}
            </span>
          </div>
          <div className="flex flex-col gap-2 ml-5">
            <span className="text-[#4D4D4D] text-[14px] font-normal">{translate("contracts.service_details.tax")}</span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {contractDetails?.offerID?.taxAmount} (7.7%)
            </span>
          </div>
        </div>

        <hr className="opacity-20 mt-2" />

        <div className="grid grid-cols-2 mt-3">
          <span className="text-[#1E1E1E] text-base font-semibold">
            Grand Total:
          </span>

          <span className="text-[#1E1E1E] text-base font-semibold ml-5">
            {contractDetails?.offerID?.total} CHF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsData;
