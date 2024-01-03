import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import Image from "next/image";
import { staticEnums } from "@/utils/static";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import { getKeyByValue } from "@/utils/auth.util";

const customerDetailData = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const { leadDetails } = useAppSelector((state) => state.lead);

  const { t: translate } = useTranslation();
  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 "
        id="Customer Details"
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("leads.customer_details.heading")}
        </h2>
        <button
          onClick={() =>
            onClick(ComponentsType.customer, ComponentsType.customerEdit)
          }
          className="flex  items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("leads.customer_details.edit_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />

      <div className="mt-5">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3  gap-y-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.customer_details.customer_type")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {getKeyByValue(
                staticEnums["CustomerType"],
                leadDetails?.customerDetail?.customerType
              )}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.customer_details.full_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.customerDetail?.fullName}
            </div>
          </div>
          {Number(leadDetails?.customerDetail?.customerType) === 1 && (
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Company Name
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {leadDetails?.customerDetail?.companyName}
              </div>
            </div>
          )}
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.customer_details.email_address")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 overflow-hidden whitespace-nowrap">
              <span className="overflow-hidden text-[#4B4B4B] font-medium text-overflow-ellipsis">
                {leadDetails?.customerDetail?.email}
              </span>
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.customer_details.phone_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.customerDetail?.phoneNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.customer_details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.customerDetail?.mobileNumber}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">
            {translate("leads.customer_details.address_details")}
          </h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.customer_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {leadDetails?.customerDetail?.address?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.customer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {leadDetails?.customerDetail?.address?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.customer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {leadDetails?.customerDetail?.address?.country}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default customerDetailData;
