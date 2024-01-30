import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { replaceClassesWithInlineStyles } from "@/utils/utility";

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
              query: { offer: offerDetails?.id, tab: 3 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("offers.additional_details.edit_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />

      <div className="py-[25px] px-[30px]">
        <div
          className="html-content w-full rounded-lg border border-[#EBEBEB] bg-white px-4 py-6 text-[#4B4B4B] font-normal text-base break-all"
          dangerouslySetInnerHTML={{ __html: replaceClassesWithInlineStyles(offerDetails?.additionalDetails || "") }}
        />
      </div>
    </LeadsCardLayout>
  );
};

export default AdditionalDetails;
