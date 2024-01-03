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
      <h2 className="text-[#393939] text-lg font-medium">
        {translate("contracts.address_details.main_heading")}
      </h2>
      <hr className="opacity-20 my-6" />
      {contractDetails.offerID?.addressID?.address?.map((item, key) => (
        <div className="my-5" key={key}>
          <h4 className="text-[#8F8F8F] mb-[10px]">
            {translate("contracts.address_details.main_heading")}
          </h4>
          <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5">
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
                {item.country}
              </div>
            </div>
          </div>

          <div className="mt-5 w-full">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("contracts.address_details.description")}
            </label>
            <div className="h-[52px] rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressDetailsData;
