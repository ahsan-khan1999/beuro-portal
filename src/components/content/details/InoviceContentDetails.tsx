import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "./ContentDetailsData";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const InoviceContentDetails = ({
  contentDetail,
  onClick,
}: {
  contentDetail: ContentTableRowTypes;
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("content.tabs_headings.invoice_content")}
    >
      <div className="flex justify-between items-center bg-[#C50EE0] rounded-t-lg py-5 px-6">
        <h2 className="text-white text-xl font-medium">
          {translate("content.details.invoice_heading")}
        </h2>

        <button
          onClick={() => onClick(3, ComponentsType.editInvoiceContent)}
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
              {translate("content.details.invoice_title")}
            </p>
            <p className="border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] bg-white truncate">
              {contentDetail?.invoiceContent?.title}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[#1E1E1E] font-semibold text-sm mb-[10px]">
                {translate("content.details.invoice_description")}
              </p>
              {/* <Button
                inputType="button"
                onClick={() =>
                  router.push({
                    pathname: `/content/pdf-preview`,
                    query: {
                      ...router.query,
                      contentID: contentDetail?.id,
                      contentPdfType: ContentPDFComponents.INVOICE_CONTENT_PDF,
                    },
                  })
                }
                className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap mb-[10px]"
                text={translate("common.pdf_preview")}
                id="pdf"
                iconAlt="content PDF"
              /> */}
            </div>
            <div
              className="html-content border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] bg-white break-all"
              dangerouslySetInnerHTML={{
                __html: contentDetail?.invoiceContent?.description,
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
                __html: contentDetail?.invoiceContent?.body,
              }}
            />
          </div>

          <div className="w-full xl:w-[90%]">
            <span className="text-[#1E1E1E] font-semibold text-sm">
              {translate("content.details.attachments")}
            </span>
            {contentDetail?.invoiceContent?.attachments?.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-2">
                {contentDetail?.invoiceContent?.attachments?.map(
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

export default InoviceContentDetails;
