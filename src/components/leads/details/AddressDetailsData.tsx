import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import Image from "next/image";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

const AddressDetailsData = ({
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
        id={translate("leads.tabs_headings.address")}
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("leads.address_details.main_heading")}
        </h2>
        <button
          onClick={() => onClick(1, ComponentsType.addressEdit)}
          className="flex  gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("leads.address_details.edit_button")}
        </button>
      </div>
      <hr className="opacity-20 mb-5" />

      {leadDetails?.addressID?.address?.map((item, key) => (
        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">
            {item?.label}
          </h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.address_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.address_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.address_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.country}
              </div>
            </div>
          </div>

          <div className="mt-5 w-full">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("leads.address_details.description")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 break-all text-[#4B4B4B] font-medium min-h-[58px]">
              {item?.description}
            </div>
          </div>
        </div>
      ))}
    </LeadsCardLayout>
  );
};

export default AddressDetailsData;
