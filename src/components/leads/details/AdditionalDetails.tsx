import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";

const AdditionalDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;

}) => {
  const { leadDetails } = useAppSelector(state => state.lead)

  return (
    <LeadsCardLayout>
      <div className="flex justify-between items-center pb-5 " id="Additional Details">
        <h2 className="text-[#393939] text-lg font-medium">
          Additional Details
        </h2>
        <button
          onClick={() => onClick(3, ComponentsType.additionalEdit)}
          className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          Edit Details
        </button>
      </div>
      <hr className="opacity-20 mb-5" />


      <div className="py-[25px] px-[30px]">
        <div className="rounded-lg border border-[#EBEBEB] bg-white px-4 py-6  ">
          <div className="text-[#4B4B4B] font-normal text-base" dangerouslySetInnerHTML={{ __html: leadDetails?.additionalDetails }} />


        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default AdditionalDetails;
