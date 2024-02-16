import { contractTableTypes } from "@/types/contract";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import React from "react";

const OfferDetailsData = ({
  contractDetails,
}: {
  contractDetails: contractTableTypes;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit"
      id={translate("contracts.tabs_headings.offer_details")}
    >
      <h2 className="text-[#393939] text-lg font-medium border-b border-b-[#000] border-opacity-10 pb-5">
        {translate("contracts.customer_details.heading")}
      </h2>

      <div className="mt-5">
        <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("contracts.customer_details.customer_type")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {translate(
                `customer_type.${getKeyByValue(
                  staticEnums["CustomerType"],
                  contractDetails.offerID?.leadID?.customerDetail?.customerType
                )}`
              )}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("contracts.customer_details.full_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {contractDetails.offerID?.leadID?.customerDetail?.fullName}
            </div>
          </div>
          {staticEnums["CustomerType"][
            contractDetails?.offerID?.leadID?.customerDetail?.customerType
          ] === 1 && (
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.company_name")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {contractDetails?.offerID?.leadID?.customerDetail?.companyName}
              </div>
            </div>
          )}
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("contracts.customer_details.email_address")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {contractDetails?.offerID?.leadID?.customerDetail?.email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("contracts.customer_details.phone_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("contracts.customer_details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {contractDetails?.offerID?.leadID?.customerDetail?.mobileNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("customers.details.gender")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {contractDetails?.offerID?.leadID?.customerDetail?.gender}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("login_detail.company_details.company_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {contractDetails?.offerID?.leadID?.customerDetail?.companyName}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">
            {translate("contracts.customer_details.address_details")}
          </h4>
          <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.streetNumber
                }
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.postalCode
                }
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {translate(
                  `countries.${contractDetails?.offerID?.leadID?.customerDetail?.address?.country}`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsData;
