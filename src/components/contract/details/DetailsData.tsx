import Image from "next/image";
import React from "react";
import editIcon from "@/assets/svgs/name-input.svg";
import watchIcon from "@/assets/svgs/time.svg";
import colorFullPDFIcon from "@/assets/svgs/color_pdf_icon.svg";
import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import { contractTableTypes } from "@/types/contract";
import { formatDateToCustomString } from "@/utils/functions";

const DetailsData = ({ contractDetails }: { contractDetails: contractTableTypes }) => {
  return (
    <ContractCardLayout>
      <div className="flex justify-between items-center">
        <div className="text-[#4D4D4D] text-base font-medium">
          No: &nbsp; {contractDetails?.contractNumber}
        </div>
        <div className="flex items-center gap-[10px]">
          <Image src={editIcon} alt="edit_icon" />
          <span className="text-[#4B4B4B] text-base font-medium">
            {contractDetails?.contractNumber + " " + contractDetails?.offerID?.title}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <Image src={watchIcon} alt="watchIcon" />
          <span className="text-[#4B4B4B] text-base font-medium">
            {formatDateToCustomString(contractDetails?.offerID?.createdAt)}
          </span>
        </div>
        <div className="flex  justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <Image src={watchIcon} alt="watchIcon" />
            <span className="text-[#4B4B4B] text-base font-medium">
              18:40:15, 25/08/2023
            </span>
          </div>

          <div className="flex justify-center items-center">
            <Image
              src={colorFullPDFIcon}
              alt="colorFullPDFIcon"
              className="mr-[68px]"
            />
          </div>
        </div>
      </div>
    </ContractCardLayout>
  );
};

export default DetailsData;
