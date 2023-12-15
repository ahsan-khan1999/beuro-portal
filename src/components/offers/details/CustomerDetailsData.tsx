import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { OffersTableRowTypes } from "@/types/offers";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { getKeyByValue } from "@/utils/auth.util";

const CustomerDetailsData = ({ offerDetails }: { offerDetails: OffersTableRowTypes }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 "
        id="Offer Details"
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.offer_details.heading")}
        </h2>
        <button
          onClick={() => router.push({
            pathname: "/offers/edit",
            query: { offer: offerDetails?.id },
          })}
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("offers.offer_details.edit_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />
      <div className="mt-5">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 mb-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Offer Title
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.title}

            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.customer_type")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {getKeyByValue(staticEnums["CustomerType"], offerDetails?.leadID?.customerDetail?.customerType)}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.full_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.leadID?.customerDetail?.fullName}

            </div>
          </div>
          {
            staticEnums["CustomerType"][offerDetails?.leadID?.customerDetail?.customerType] === 1 &&
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Company Name
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.leadID?.customerDetail?.companyName}

              </div>
            </div>
          }
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.email_address")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.leadID?.customerDetail?.email}

            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.phone_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.leadID?.customerDetail?.phoneNumber}

            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("offers.offer_details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
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
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.leadID?.customerDetail?.address?.streetNumber}

              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.leadID?.customerDetail?.address?.postalCode}

              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.offer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.leadID?.customerDetail?.address?.country}

              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout >
  );
};

export default CustomerDetailsData;
