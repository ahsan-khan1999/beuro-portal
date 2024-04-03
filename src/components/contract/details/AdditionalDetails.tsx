import { contractTableTypes } from "@/types/contract";
import { useTranslation } from "next-i18next";
import React from "react";

const AdditionalDetails = ({
  contractDetails,
}: {
  contractDetails: contractTableTypes;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit"
      id={translate("contracts.tabs_headings.additional_details")}
    >
      <h2 className="text-[#393939] text-lg font-medium border-b border-b-[#000] border-opacity-10 pb-5">
        {translate("contracts.additional_details.heading")}
      </h2>

      <div className="mt-3 rounded-lg px-2 py-3 bg-[#EDF4FF]">
        <div
          className="html-content w-full rounded-lg border border-[#EBEBEB] bg-white px-4 py-6 text-[#4B4B4B] font-normal text-base break-all"
          dangerouslySetInnerHTML={{
            __html: contractDetails?.additionalDetails,
          }}
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;
