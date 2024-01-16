import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { ComponentsType } from "./ContentDetailsData";
import { useTranslation } from "next-i18next";

const OfferContentDetailsData = ({
  onClick,
  contentDetail,
}: {
  onClick: (index: number, component: ComponentsType) => void;
  contentDetail: ContentTableRowTypes;
}) => {
  const { t: translate } = useTranslation();

  const filesData: string[] = [
    "First File",
    "Second File",
    "Third File",
    "Fourth File",
    "Fifth File",
    "Sixth File",
  ];

  return (
    <div
      className="rounded-md border-none bg-white pt-5 px-6 pb-6 border w-full h-fit"
      id={translate("content.tabs_headings.offer_content")}
    >
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("content.details.offer_heading")}
        </h2>
        <button
          onClick={() => onClick(0, ComponentsType.editOfferContent)}
          className="flex gap-x-4 items-center text-[#532d2d] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("content.details.edit_button")}
        </button>
      </div>

      <div className="mt-5">
        <div>
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.content_name")}
          </p>
          <p className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]">
            {contentDetail?.contentName}
          </p>
        </div>

        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.address_labels")}
          </p>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
            {contentDetail?.offerContent?.address?.map((item, key) => (
              <span
                className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
                key={key}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.offer_title")}
          </p>
          <p className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]">
            {contentDetail?.offerContent?.title}
          </p>
        </div>

        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.offer_description")}
          </p>
          <div
            className="html-content border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
            dangerouslySetInnerHTML={{
              __html: contentDetail?.offerContent?.description,
            }}
          />
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.email_body")}
          </p>
          <div
            className="html-content border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
            dangerouslySetInnerHTML={{
              __html: contentDetail?.offerContent?.body,
            }}
          />
        </div>

        {/* attachments is here */}
        <div className="mt-5 w-full xl:w-[90%]">
          <span className="text-[#1E1E1E] font-normal text-[14px] ">
            {translate("content.details.attachments")}
          </span>
          <div className="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-2">
            {contentDetail?.offerContent?.attachments.map((item, index) => (
              <AttachmentsFiles fileName={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferContentDetailsData;
