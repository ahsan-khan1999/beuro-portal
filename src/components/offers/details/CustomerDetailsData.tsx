import React from "react";
import { useRouter } from "next/router";
import { OffersTableRowTypes } from "@/types/offers";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { getKeyByValue } from "@/utils/auth.util";
import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { germanDateFormat } from "@/utils/utility";

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
        className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.offer")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.offer_details.heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 0 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
        >
          <EditIcon />
          {translate("offers.offer_details.edit_button")}
        </button>
      </div>

      <div className="py-3 px-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 py-3 bg-[#EDF4FF]">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.offer_title")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.title}
            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.customer_type")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
              {translate(
                `customer_type.${getKeyByValue(
                  staticEnums["CustomerType"],
                  offerDetails?.leadID?.customerDetail?.customerType
                )}`
              )}
            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("customers.details.gender")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.leadID?.customerDetail?.gender}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.full_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
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
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {offerDetails?.leadID?.customerDetail?.companyName}
              </div>
            </div>
          )}

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.email_address")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.leadID?.customerDetail?.email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.phone_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.leadID?.customerDetail?.phoneNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.leadID?.customerDetail?.mobileNumber}
            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("common.lead")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.leadID?.refID}
            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("common.time")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {offerDetails?.time}
            </div>
          </div>

          {/* <div className="flex flex-col gap-y-5">
            {offerDetails?.date?.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-x-3">
                  {item?.startDate && (
                    <div className="w-full">
                      <label className="text-[#4D4D4D] mb-3 block text-sm">
                        {translate("common.start_date")}
                      </label>
                      <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                        {item.startDate}
                      </div>
                    </div>
                  )}

                  {item?.endDate && (
                    <div className="w-full">
                      <label className="text-[#4D4D4D] mb-3 block text-sm">
                        {translate("common.end_date")}
                      </label>
                      <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                        {item.endDate}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div> */}
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 py-3 bg-[#EDF4FF]">
          {offerDetails?.date?.map((item, index) => {
            const isPair = item?.startDate && item?.endDate;

            return (
              <div
                key={index}
                className={`flex gap-3 ${
                  index % 2 === 0 ? "col-start-1" : "col-start-2"
                }`}
              >
                {item?.startDate && (
                  <div className={isPair ? "w-full" : "w-fit"}>
                    <label className="text-[#4D4D4D] mb-3 block text-sm">
                      {translate("common.start_date")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                      {germanDateFormat(item.startDate)}
                    </div>
                  </div>
                )}
                {item?.endDate && (
                  <div className={isPair ? "w-full" : "w-fit"}>
                    <label className="text-[#4D4D4D] mb-3 block text-sm">
                      {translate("common.end_date")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                      {germanDateFormat(item.endDate)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <h4 className="text-base font-semibold text-[#1E1E1E] mb-[10px]">
            {translate("offers.offer_details.customer_address")}
          </h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-b-lg px-2 py-3 bg-[#EDF4FF]">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {offerDetails?.leadID?.customerDetail?.address?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {offerDetails?.leadID?.customerDetail?.address?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {offerDetails?.leadID?.customerDetail?.address?.country}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default CustomerDetailsData;
