import React from "react";
import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
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
        className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.additional")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.additional_details.main_heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 3 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
        >
          <EditIcon />
          {translate("offers.additional_details.edit_button")}
        </button>
      </div>

      <div className="py-3 px-6">
        <div className="rounded-lg px-2 py-3 bg-[#EDF4FF]">
          <div
            className="html-content w-full rounded-lg border border-[#EBEBEB] bg-white px-4 py-6 text-[#4B4B4B] font-normal text-base break-all"
            dangerouslySetInnerHTML={{
              __html: replaceClassesWithInlineStyles(
                offerDetails?.additionalDetails || ""
              ),
            }}
          />
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default AdditionalDetails;
