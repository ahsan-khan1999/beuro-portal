import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const AddressDetailsData = ({
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
        id={translate("offers.tabs_heading.address")}
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.address_details.main_heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 1 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("offers.address_details.edit_button")}
        </button>
      </div>
      <hr className="opacity-20 mb-5" />
      {offerDetails?.addressID?.address?.map((item, index) => (
        <div className="my-5" key={index}>
          <h4 className="text-[#8F8F8F] mb-[10px]">{item?.label}</h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.address_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.address_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.address_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {translate(`countries.${item?.country}`)}
              </div>
            </div>
          </div>

          <div className="mt-5 w-full">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("offers.address_details.description")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium break-all">
              {item?.description}
            </div>
          </div>
        </div>
      ))}
    </LeadsCardLayout>
  );
};

export default AddressDetailsData;
