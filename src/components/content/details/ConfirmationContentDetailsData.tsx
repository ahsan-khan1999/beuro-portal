import React from "react";
import AttachmentsFiles from "./AttachmentsFiles";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "./ContentDetailsData";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const ConfirmationContentDetailsData = ({
  contentDetail,
  onClick,
}: {
  contentDetail: ContentTableRowTypes;
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className="rounded-md border-none bg-white pt-5 px-6 pb-6 border w-full h-fit"
      id={translate("content.tabs_headings.confirmation_content")}
    >
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-10">
        <div className="flex space-x-2 items-center my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="18"
            viewBox="0 0 25 18"
            fill="#393939"
          >
            <g clipPath="url(#clip0_1924_79359)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2227 0.171875C17.1932 0.171875 21.2227 4.20132 21.2227 9.17188C21.2227 14.1424 17.1932 18.1719 12.2227 18.1719C7.25211 18.1719 3.22266 14.1424 3.22266 9.17188C3.22266 4.20132 7.25211 0.171875 12.2227 0.171875ZM8.00991 9.70621L10.5731 12.0601C10.947 12.4042 11.5258 12.3859 11.8773 12.0232L16.45 7.64514C16.8219 7.28735 16.8334 6.69579 16.4756 6.3239C16.1178 5.95198 15.5263 5.9405 15.1544 6.29825L11.1934 10.0906L9.27628 8.33C8.89626 7.98031 8.30469 8.00488 7.95501 8.3849C7.60532 8.76496 7.62988 9.35653 8.00991 9.70621Z"
                fill={"#393939"}
              />
            </g>
            <defs>
              <clipPath id="clip0_1924_79359">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.105469 0.222656)"
                />
              </clipPath>
            </defs>
          </svg>
          <h2 className="text-[#393939] text-lg font-medium">
            {translate("content.details.confirmation_heading")}
          </h2>
        </div>

        <button
          onClick={() => onClick(1, ComponentsType.editConfirmationContent)}
          className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("content.details.edit_button")}
        </button>
      </div>

      <div className="mt-5">
        <div>
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.confirmation_title")}
          </p>
          <p className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]">
            {contentDetail?.confirmationContent?.title}
          </p>
        </div>

        <div className="flex flex-col mt-5">
          <p className="text-[#1E1E1E] font-normal text-[14px] mb-[10px]">
            {translate("content.details.Confirmation_description")}
          </p>
          <div
            className="html-content border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]"
            dangerouslySetInnerHTML={{
              __html: contentDetail?.confirmationContent?.description,
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
              __html: contentDetail?.confirmationContent?.body,
            }}
          />
        </div>

        <div className="mt-5 w-full xl:w-[90%]">
          <span className="text-[#1E1E1E] font-normal text-[14px] ">
            {translate("content.details.attachments")}
          </span>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {contentDetail?.confirmationContent?.attachments?.map(
              (item, index) => (
                <AttachmentsFiles fileName={item} key={index} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationContentDetailsData;
