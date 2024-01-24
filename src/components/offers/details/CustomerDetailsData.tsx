import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { getKeyByValue } from "@/utils/auth.util";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const CustomerDetailsData = ({
  offerDetails,
}: {
  offerDetails: OffersTableRowTypes;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 "
        id={translate("offers.tabs_heading.offer")}
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.offer_details.heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 0 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("offers.offer_details.edit_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />
      <div className="mt-5">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 mb-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.offer_title")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium overflow-clip text-ellipsis min-h-[58px]">
              {offerDetails?.title}
            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.customer_type")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
              {getKeyByValue(
                staticEnums["CustomerType"],
                offerDetails?.leadID?.customerDetail?.customerType
              )}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.full_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
              {offerDetails?.leadID?.customerDetail?.fullName}
            </div>
          </div>
          {staticEnums["CustomerType"][
            offerDetails?.leadID?.customerDetail?.customerType
          ] === 1 && (
              <div>
                <label className="text-[#4D4D4D] mb-3 block text-sm">
                  {translate("offers.offer_details.company_name")}
                </label>
                <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                  {offerDetails?.leadID?.customerDetail?.companyName}
                </div>
              </div>
            )}
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.email_address")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
              {offerDetails?.leadID?.customerDetail?.email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.phone_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
              {offerDetails?.leadID?.customerDetail?.phoneNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
              {offerDetails?.leadID?.customerDetail?.mobileNumber}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">
            {translate("offers.offer_details.customer_address")}
          </h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {offerDetails?.leadID?.customerDetail?.address?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {offerDetails?.leadID?.customerDetail?.address?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {translate(`countries.${offerDetails?.leadID?.customerDetail?.address?.country}`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default CustomerDetailsData;
