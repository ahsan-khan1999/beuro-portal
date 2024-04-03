import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import { contractTableTypes } from "@/types/contract";
import { useTranslation } from "next-i18next";
import React from "react";

const AddressDetailsData = ({
  contractDetails,
}: {
  contractDetails: contractTableTypes;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit"
      id={translate("contracts.tabs_headings.address_details")}
    >
      <h2 className="text-[#393939] text-lg font-medium border-b border-b-[#000] border-opacity-10 pb-5">
        {translate("contracts.address_details.main_heading")}
      </h2>

      {contractDetails.offerID?.addressID?.address?.map((item, key) => (
        <div className="my-5" key={key}>
          <h4 className="text-[#1E1E1E] text-base font-semibold mb-[10px]">
            {translate("contracts.address_details.main_heading")}
          </h4>
          <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.address_details.street_no")}.
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {item.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.address_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {item.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.address_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {translate(`countries.${item.country}`)}
              </div>
            </div>
          </div>

          <div className="w-full rounded-t-lg px-2 pb-3 bg-[#EDF4FF]">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("contracts.address_details.description")}
            </label>
            <div className="min-h-[52px] rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium break-all">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressDetailsData;
