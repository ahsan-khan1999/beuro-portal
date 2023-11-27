import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import Image from "next/image";
import { ComponentsType } from "./ContentDetailsData";

const ReceiptContentDetails = ({
  contentDetail,
  onClick,
}: {
  contentDetail: ContentTableRowTypes;
  onClick: (index: number, component: ComponentsType) => void;
}) => {


  return (
    <div
      className="rounded-md border-none bg-white pt-5 px-6 pb-6 border w-full h-fit"
      id="Receipt Content"
    >
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Receipt Content</h2>
        <button
          onClick={() => onClick(3, ComponentsType.editReceiptContent)}
          className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="edit" />
          Edit Details
        </button>
      </div>

      <div className="mt-5">
        <div>
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            Receipt Title
          </p>
          <p className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
            {contentDetail?.receiptContent?.title}
          </p>
        </div>

        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            Offer Description
          </p>
          <div className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base" dangerouslySetInnerHTML={{ __html: contentDetail?.receiptContent?.description }} />

        </div>
        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            Email Body
          </p>
          <div className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base" dangerouslySetInnerHTML={{ __html: contentDetail?.receiptContent?.body }} />
        </div>

        {/* attachments is here */}
        <div className="mt-5 w-[90%]">
          <span className="text-[#1E1E1E] font-normal text-[14px] ">
            Attachments
          </span>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {contentDetail?.receiptContent?.attachments?.map((item, index) => (
              <AttachmentsFiles fileName={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptContentDetails;
