import { contractTableTypes } from "@/types/contract";
import { useTranslation } from "next-i18next";
import React from "react";

const AddressDetailsData = ({
  contractDetails,
}: {
  contractDetails: contractTableTypes;
}) => {
  const { t: translate } = useTranslation();
  const addressData = contractDetails.offerID?.addressID?.address || [{}];

  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("contracts.tabs_headings.address_details")}
    >
      <h2 className="text-[#fff] text-xl font-medium bg-[#FE9244] py-5 px-6 rounded-t-lg">
        {translate("contracts.address_details.main_heading")}
      </h2>

      {addressData?.map((item, key) => (
        <div className="py-3 px-6" key={key}>
          <h4 className="text-[#1E1E1E] text-base font-semibold mb-[10px]">
            {item?.label}
          </h4>
          <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.address_details.street_no")}.
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {item.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.address_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {item.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.address_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {item.country}
              </div>
            </div>
          </div>

          <div className="w-full rounded-t-lg px-2 pb-3 bg-[#EDF4FF]">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("contracts.address_details.description")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium break-all min-h-[58px]">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressDetailsData;
