import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

const AdditionalDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const { leadDetails } = useAppSelector((state) => state.lead);

  const { t: translate } = useTranslation();
  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 border-b border-[#e5e5e5]"
        id="Additional Details"
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("leads.additional.heading")}
        </h2>
        <button
          onClick={() => onClick(3, ComponentsType.additionalEdit)}
          className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("leads.additional.edit_button")}
        </button>
      </div>

      <div className="rounded-lg border border-[#EBEBEB] bg-white px-4 py-6 mt-6">
        <div
          className="text-[#4B4B4B] font-normal text-base"
          dangerouslySetInnerHTML={{ __html: leadDetails?.additionalDetails }}
        />
      </div>
    </LeadsCardLayout>
  );
};

export default AdditionalDetails;
