import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "./ContentDetailsData";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const ReceiptContentDetails = ({
  contentDetail,
  onClick,
}: {
  contentDetail: ContentTableRowTypes;
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("content.tabs_headings.receipt_content")}
    >
      <div className="flex justify-between items-center bg-[#45C769] rounded-t-lg py-5 px-6">
        <h2 className="text-white text-xl font-medium">
          {translate("content.tabs_headings.receipt_content")}
        </h2>
        <button
          onClick={() => onClick(4, ComponentsType.editReceiptContent)}
          className="bg-white flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("content.details.edit_button")}
        </button>
      </div>

      <div className="px-5 py-3">
        <div className="grid grid-cols-1 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]">
          <div>
            <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
              {translate("content.details.receipt_title")}
            </p>
            <p className="border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] truncate bg-white">
              {contentDetail?.receiptContent?.title}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
                {translate("content.details.receipt_description")}
              </p>
            </div>

            <div
              className="html-content border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] bg-white break-all"
              dangerouslySetInnerHTML={{
                __html: contentDetail?.receiptContent?.description,
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
                __html: contentDetail?.receiptContent?.body,
              }}
            />
          </div>

          <div className="w-full xl:w-[90%]">
            <span className="text-[#1E1E1E] font-semibold text-sm ">
              {translate("content.details.attachments")}
            </span>
            {contentDetail?.receiptContent?.attachments?.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-2">
                {contentDetail?.receiptContent?.attachments?.map(
                  (item, index) => (
                    <AttachmentsFiles fileName={item} key={index} />
                  )
                )}
              </div>
            ) : (
              <p className="text-center text-xl font-medium text-primary">
                {translate("common.no_attachments")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptContentDetails;
