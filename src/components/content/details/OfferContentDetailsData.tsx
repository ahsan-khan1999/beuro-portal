import React, { useEffect, useRef } from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "./ContentDetailsData";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const OfferContentDetailsData = ({
  onClick,
  contentDetail,
}: {
  onClick: (index: number, component: ComponentsType) => void;
  contentDetail: ContentTableRowTypes;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-lg border-none bg-white border w-full h-fit"
      id={translate("content.tabs_headings.offer_content")}
    >
      <div className="flex justify-between items-center bg-[#4A13E7] rounded-t-lg pt-[17px] pb-[22px] pl-[29px] pr-6">
        <h2 className="text-white text-lg font-medium">
          {translate("content.details.offer_heading")}
        </h2>

        <button
          onClick={() => onClick(0, ComponentsType.editOfferContent)}
          className="bg-white flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("content.details.edit_button")}
        </button>
      </div>

      <div className="px-5 py-3">
        <div className="grid grid-cols-1 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]">
          <div>
            <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
              {translate("content.details.content_name")}
            </p>
            <p className="border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] truncate bg-white">
              {contentDetail?.contentName}
            </p>
          </div>

          {/* <div className="flex flex-col">
            <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
              {translate("content.details.address_labels")}
            </p>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              {contentDetail?.offerContent?.address?.map((item, key) => (
                <span
                  className="border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
                  key={key}
                >
                  {item}
                </span>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col">
            <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
              {translate("content.details.offer_title")}
            </p>
            <p className="border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] truncate bg-white">
              {contentDetail?.offerContent?.title}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
              {translate("content.details.offer_description")}
            </p>
            <div
              className="html-content border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] bg-white break-all"
              dangerouslySetInnerHTML={{
                __html: contentDetail?.offerContent?.description,
              }}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
              {translate("content.details.email_body")}
            </p>
            <div
              className="html-content border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] bg-white break-all"
              dangerouslySetInnerHTML={{
                __html: contentDetail?.offerContent?.body,
              }}
            />
          </div>

          <div className="mt-5 w-full xl:w-[90%]">
            <span className="text-[#1E1E1E] font-semibold text-sm">
              {translate("content.details.attachments")}
            </span>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {contentDetail?.offerContent?.attachments.map((item, index) => (
                <AttachmentsFiles fileName={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferContentDetailsData;
