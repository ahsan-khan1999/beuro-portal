import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { useTranslation } from "next-i18next";

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
        className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.address")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.address_details.main_heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 1 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
        >
          <EditIcon />
          {translate("offers.address_details.edit_button")}
        </button>
      </div>

      {offerDetails?.addressID?.address?.map((item, index) => (
        <div className="py-3 px-6" key={index}>
          <h4 className="text-base font-semibold text-[#1E1E1E] mb-[10px]">
            {item?.label}
          </h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.address_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {item?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.address_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {item?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("offers.address_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {item?.country}
              </div>
            </div>
          </div>

          <div className="w-full rounded-b-lg px-2 pb-3 bg-[#EDF4FF]">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("offers.address_details.description")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium break-all min-h-[58px]">
              {item?.description}
            </div>
          </div>
        </div>
      ))}
    </LeadsCardLayout>
  );
};

export default AddressDetailsData;
