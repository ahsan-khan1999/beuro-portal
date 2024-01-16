import { Customers } from "@/types/customer";
import { useTranslation } from "next-i18next";
import React from "react";

const SideCard = ({ customerDetail }: { customerDetail: Customers }) => {
  const { t: translate } = useTranslation();
  return (
    <div className=" bg-white rounded-md px-5 py-6 w-full h-[634px]">
      <h2 className="text-[#393939] text-lg font-medium pb-6 border-b border-black border-opacity-20">
        {translate("customers.side_bar_details.heading")}
      </h2>
      <div className="flex justify-between my-5">
        <div className="flex flex-col space-y-4">
          <span className="text-[#4B4B4B] font-medium">
            {translate("customers.side_bar_details.lead_id")}:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            {translate("customers.side_bar_details.name")}:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            {translate("customers.side_bar_details.lead_source")}:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            {translate("customers.side_bar_details.lead_status")}:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            {translate("customers.side_bar_details.lead_expire")}:
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          <span>{customerDetail?.lead?.id}</span>
          <span>{customerDetail?.lead?.name}</span>
          <span>{customerDetail?.lead?.source}</span>
          <span>{customerDetail?.lead?.status}</span>
          <span>{customerDetail?.lead?.expires}</span>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
