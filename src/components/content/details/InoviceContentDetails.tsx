import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "./ContentDetailsData";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const InoviceContentDetails = ({
  contentDetail,
  onClick,
}: {
  contentDetail: ContentTableRowTypes;
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("content.tabs_headings.invoice_content")}
    >
      <div className="flex justify-between items-center bg-[#C50EE0] rounded-t-lg pt-[17px] pb-[22px] pl-[29px] pr-6">
        {/* <div className="flex space-x-2 items-center my-auto"> */}
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="19"
            viewBox="0 0 15 19"
            fill="#393939"
          >
            <g clipPath="url(#clip0_1924_79355)">
              <path
                d="M13.9717 2.11845C13.9717 0.948295 13.0234 0 11.8532 0H2.22392C1.05376 0 0.105469 0.948295 0.105469 2.11845V16.3698C0.105469 17.54 1.05376 18.4883 2.22392 18.4883H11.8532C13.0234 18.4883 13.9717 17.54 13.9717 16.3698V2.11845ZM4.6351 7.12569H4.04964C3.1491 7.12569 2.4165 6.39309 2.4165 5.49256C2.4165 4.68293 3.00043 4.01658 3.76461 3.881V3.27397C3.76461 2.95504 4.02344 2.69621 4.34237 2.69621C4.66129 2.69621 4.92013 2.95504 4.92013 3.27397V3.85173H5.69047C6.00939 3.85173 6.26823 4.11056 6.26823 4.42948C6.26823 4.74841 6.00939 5.00724 5.69047 5.00724H4.04964C3.78618 5.00724 3.57202 5.2214 3.57202 5.48486C3.57202 5.75602 3.78618 5.97017 4.04964 5.97017H4.6351C5.53563 5.97017 6.26823 6.70277 6.26823 7.60331C6.26823 8.41294 5.68431 9.07929 4.92013 9.21487V9.82113C4.92013 10.1401 4.66129 10.3989 4.34237 10.3989C4.02344 10.3989 3.76461 10.1401 3.76461 9.82113V9.24414H2.99426C2.67534 9.24414 2.4165 8.9853 2.4165 8.66638C2.4165 8.34746 2.67534 8.08862 2.99426 8.08862H4.6351C4.89856 8.08862 5.11271 7.87447 5.11271 7.61101C5.11271 7.33985 4.89856 7.12569 4.6351 7.12569ZM11.0829 16.1772H2.99426C2.67534 16.1772 2.4165 15.9184 2.4165 15.5995C2.4165 15.2806 2.67534 15.0217 2.99426 15.0217H11.0829C11.4018 15.0217 11.6606 15.2806 11.6606 15.5995C11.6606 15.9184 11.4018 16.1772 11.0829 16.1772ZM11.0829 13.0959H2.99426C2.67534 13.0959 2.4165 12.837 2.4165 12.5181C2.4165 12.1992 2.67534 11.9403 2.99426 11.9403H11.0829C11.4018 11.9403 11.6606 12.1992 11.6606 12.5181C11.6606 12.837 11.4018 13.0959 11.0829 13.0959ZM11.0829 10.0145H8.38668C8.06776 10.0145 7.80892 9.75565 7.80892 9.43673C7.80892 9.1178 8.06776 8.85897 8.38668 8.85897H11.0829C11.4018 8.85897 11.6606 9.1178 11.6606 9.43673C11.6606 9.75565 11.4018 10.0145 11.0829 10.0145ZM11.0829 6.93311H8.38668C8.06776 6.93311 7.80892 6.67427 7.80892 6.35535C7.80892 6.03642 8.06776 5.77759 8.38668 5.77759H11.0829C11.4018 5.77759 11.6606 6.03642 11.6606 6.35535C11.6606 6.67427 11.4018 6.93311 11.0829 6.93311Z"
                fill="#393939"
              />
            </g>
            <defs>
              <clipPath id="clip0_1924_79355">
                <rect
                  width="14"
                  height="19"
                  fill="white"
                  transform="translate(0.105469)"
                />
              </clipPath>
            </defs>
          </svg> */}
        <h2 className="text-white text-lg font-medium">
          {translate("content.details.invoice_heading")}
        </h2>
        {/* </div> */}

        <button
          onClick={() => onClick(2, ComponentsType.editInvoiceContent)}
          className="bg-white flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("content.details.edit_button")}
        </button>
      </div>

      <div className="px-5 py-3">
        <div className="grid grid-cols-1 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]">
          <div>
            <p className="text-[#1E1E1E] font-semibold text-[14px] mb-[10px]">
              {translate("content.details.invoice_title")}
            </p>
            <p className="border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]">
              {contentDetail?.invoiceContent?.title}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-[#1E1E1E] font-semibold text-[14px] mb-[10px]">
              {translate("content.details.invoice_description")}
            </p>

            <div
              className="html-content border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
              dangerouslySetInnerHTML={{
                __html: contentDetail?.invoiceContent?.description,
              }}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-[#1E1E1E] font-semibold text-[14px] mb-[10px]">
              {translate("content.details.email_body")}
            </p>
            <div
              className="html-content border border-[#c4c4c4] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
              dangerouslySetInnerHTML={{
                __html: contentDetail?.invoiceContent?.body,
              }}
            />
          </div>

          <div className="w-full xl:w-[90%]">
            <span className="text-[#1E1E1E] font-semibold text-[14px] ">
              {translate("content.details.attachments")}
            </span>
            <div className="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-2">
              {contentDetail?.invoiceContent?.attachments?.map(
                (item, index) => (
                  <AttachmentsFiles fileName={item} key={index} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InoviceContentDetails;
