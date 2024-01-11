import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { useTranslation } from "next-i18next";

const AdditionalDetails = ({
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
        id={translate("offers.tabs_heading.additional")}
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.additional_details.main_heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("offers.additional_details.edit_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />

      <div className="py-[25px] px-[30px]">
        <div
          className="html-content w-full rounded-lg border border-[#EBEBEB] bg-white px-4 py-6 text-[#4B4B4B] font-normal text-base break-all"
          dangerouslySetInnerHTML={{ __html: offerDetails?.additionalDetails }}
        />
      </div>
    </LeadsCardLayout>
  );
};

export default AdditionalDetails;
