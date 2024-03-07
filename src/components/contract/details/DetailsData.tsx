import Image from "next/image";
import React from "react";
import editIcon from "@/assets/svgs/name-input.svg";
import watchIcon from "@/assets/svgs/time.svg";
import { contractTableTypes } from "@/types/contract";
import { formatDateToCustomString } from "@/utils/functions";
import { PdfIcon } from "@/assets/svgs/components/pdf-icon";
import { staticEnums } from "@/utils/static";

const DetailsData = ({
  contractDetails,
  handleViewPdf,
}: {
  contractDetails: contractTableTypes;
  handleViewPdf: () => void;
}) => {
  const colorPicker = {
    [staticEnums.ContractSignedStatus.Deprecated]: "#FF0000",
    [staticEnums.ContractSignedStatus.Active]: "#45C769",
  };

  return (
    <div className="flex flex-col-reverse gap-y-3 ">
      {contractDetails?.signedContracts?.map((item) => (
        <div className="flex bg-white justify-between items-center flex-wrap gap-y-2 rounded-md py-5 px-5">
          <div className="text-[#4D4D4D] text-base font-medium">
            No: &nbsp; {contractDetails?.contractNumber}
          </div>
          <div className="flex items-center gap-[10px]">
            <Image src={editIcon} alt="edit_icon" />
            <span className="text-[#4B4B4B] text-base font-medium">
              {contractDetails?.contractNumber +
                " " +
                contractDetails?.offerID?.title}
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <Image src={watchIcon} alt="watchIcon" />
            <span className="text-[#4B4B4B] text-base font-medium">
              {formatDateToCustomString(item?.createdAt)}
            </span>
          </div>
          <div
            className="cursor-pointer mb-1"
            onClick={() => {
              window.open(item?.link);
            }}
          >
            <PdfIcon
              className="mr-[68px]"
              pathClass={colorPicker[item?.status]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsData;
