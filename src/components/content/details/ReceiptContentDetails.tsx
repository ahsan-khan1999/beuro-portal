import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "./ContentDetailsData";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { Button } from "@/base-components/ui/button/button";
import { useRouter } from "next/router";
import { ContentPDFComponents } from "@/enums/content";

const ReceiptContentDetails = ({
  contentDetail,
  onClick,
}: {
  contentDetail: ContentTableRowTypes;
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const router = useRouter();

  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("content.tabs_headings.receipt_content")}
    >
      <div className="flex justify-between items-center bg-[#45C769] rounded-t-lg py-5 px-6">
        {/* <div className="flex space-x-2 items-center my-auto"> */}
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="#1E1E1E"
          >
            <g clipPath="url(#clip0_1885_60874)">
              <path
                d="M12.4805 6.1875C11.4792 6.1875 10.5004 6.48441 9.6679 7.04068C8.83537 7.59696 8.1865 8.38761 7.80333 9.31266C7.42016 10.2377 7.31991 11.2556 7.51525 12.2376C7.71058 13.2197 8.19274 14.1217 8.90074 14.8297C9.60875 15.5377 10.5108 16.0199 11.4928 16.2152C12.4749 16.4106 13.4928 16.3103 14.4178 15.9271C15.3429 15.544 16.1335 14.8951 16.6898 14.0626C17.2461 13.2301 17.543 12.2513 17.543 11.25C17.543 9.90734 17.0096 8.61967 16.0602 7.67027C15.1108 6.72087 13.8231 6.1875 12.4805 6.1875ZM11.4961 8.4375H12.6211V9.62438H11.4961V8.4375ZM13.8867 14.0625H11.0742V12.9375H11.918V11.5594H11.0742V10.4344H12.4805C12.6297 10.4344 12.7727 10.4936 12.8782 10.5991C12.9837 10.7046 13.043 10.8477 13.043 10.9969V12.9375H13.8867V14.0625Z"
                fill="#1E1E1E"
              />
              <path
                d="M7.29984 14.625H2.91797V13.5H6.72047C6.44008 12.7829 6.29513 12.02 6.29297 11.25H2.91797V10.125H6.39984C6.64548 8.79922 7.31745 7.58997 8.31353 6.68121C9.30961 5.77245 10.5753 5.21393 11.918 5.09063V1.6875C11.918 1.38913 11.7994 1.10298 11.5885 0.892005C11.3775 0.681026 11.0913 0.5625 10.793 0.5625H4.60547L5.13422 2.15437C5.23584 2.45782 5.26389 2.78108 5.21605 3.0975C5.16821 3.41391 5.04586 3.71443 4.85908 3.97428C4.67229 4.23412 4.42643 4.44586 4.14175 4.59203C3.85707 4.7382 3.54173 4.81463 3.22172 4.815L2.91797 4.79812L0.667969 4.5V16.3125C0.667969 16.6109 0.786495 16.897 0.997474 17.108C1.20845 17.319 1.4946 17.4375 1.79297 17.4375H10.793C10.9648 17.4365 11.1342 17.396 11.288 17.3194C10.4769 17.1594 9.70617 16.8386 9.02119 16.3759C8.33621 15.9131 7.75091 15.3177 7.29984 14.625ZM6.85547 2.8125H9.66797V3.9375H6.85547V2.8125ZM2.91797 6.75H6.29297V7.875H2.91797V6.75Z"
                fill="#1E1E1E"
              />
              <path
                d="M3.88 3.37641C3.98068 3.25895 4.04874 3.11711 4.07737 2.96509C4.106 2.81306 4.09419 2.65618 4.04313 2.51016L3.48063 0.878906L1 3.37641L3.07 3.67453C3.21914 3.69565 3.37118 3.67948 3.51254 3.62745C3.65389 3.57543 3.78014 3.48917 3.88 3.37641Z"
                fill="#1E1E1E"
              />
            </g>
            <defs>
              <clipPath id="clip0_1885_60874">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0.105469)"
                />
              </clipPath>
            </defs>
          </svg> */}
        <h2 className="text-white text-lg font-medium">
          {translate("content.tabs_headings.receipt_content")}
        </h2>
        {/* </div> */}
        <button
          onClick={() => onClick(3, ComponentsType.editReceiptContent)}
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
              <Button
                inputType="button"
                onClick={() =>
                  router.push({
                    pathname: `/content/pdf-preview`,
                    query: {
                      ...router.query,
                      contentID: contentDetail?.id,
                      contentPdfType: ContentPDFComponents.RECEIPT_CONTENT_PDF,
                    },
                  })
                }
                className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap mb-[10px]"
                text={translate("common.pdf_preview")}
                id="pdf"
                iconAlt="content PDF"
              />
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
            {contentDetail?.offerContent?.attachments.length > 0 ? (
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
