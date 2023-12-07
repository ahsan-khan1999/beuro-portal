import { contractTableTypes } from "@/types/contract";
import { useTranslation } from "next-i18next";
import React from "react";

const AdditionalDetails = ({ contractDetails }: { contractDetails: contractTableTypes }) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit"
      id="Additional Details"
    >
      <h2 className="text-[#393939] text-lg font-medium">{translate("contracts.additional_details.heading")}</h2>

      <hr className="opacity-20 my-6" />

      <div className=" rounded-lg border border-[#EBEBEB] bg-white px-4 py-[27px] text-[#4B4B4B] font-normal text-base" dangerouslySetInnerHTML={{ __html: contractDetails?.offerID?.additionalDetails }} />

    </div>
  );
};

export default AdditionalDetails;
