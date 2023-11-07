import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";

const AdditionalDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
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
      <hr  className="opacity-20 mb-5"/>


      <div className="py-[25px] px-[30px]">
        <div className="rounded-lg border border-[#EBEBEB] bg-white px-4 py-6  ">
          <p className="text-[#4B4B4B] font-normal text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has a been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took is galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five lorm centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum
          </p>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default AdditionalDetails;
