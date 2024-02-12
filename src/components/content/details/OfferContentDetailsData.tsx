import React from "react";
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
      <div className="flex space-x-2 items-center my-auto">

      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="#393939"
      >
      <path d="M19.8222 11.0809C19.7389 10.9106 19.7389 10.7152 19.8222 10.5449L20.594 8.96596C21.0237 8.08683 20.6832 7.039 19.8189 6.58038L18.2664 5.75667C18.0989 5.66783 17.9841 5.50971 17.9513 5.32302L17.6477 3.59197C17.4786 2.62817 16.5871 1.98051 15.6184 2.11757L13.8783 2.36371C13.6905 2.39023 13.5048 2.32984 13.3685 2.19804L12.1054 0.97613C11.4021 0.295737 10.3003 0.295697 9.59704 0.97613L8.3339 2.19816C8.19761 2.33001 8.01189 2.39027 7.82411 2.36384L6.084 2.11769C5.11499 1.98055 4.22377 2.62829 4.05471 3.59209L3.75109 5.32307C3.71831 5.5098 3.60348 5.66787 3.43603 5.75675L1.88358 6.58046C1.01921 7.03904 0.678728 8.08696 1.10845 8.96608L1.88023 10.545C1.96349 10.7153 1.96349 10.9107 1.88023 11.081L1.10841 12.6599C0.678688 13.539 1.01917 14.5869 1.88354 15.0455L3.43599 15.8692C3.60348 15.958 3.71831 16.1162 3.75109 16.3028L4.05471 18.0339C4.20862 18.9113 4.96095 19.5266 5.82561 19.5265C5.91077 19.5265 5.99718 19.5205 6.08404 19.5083L7.82415 19.2621C8.01181 19.2355 8.19765 19.296 8.33394 19.4278L9.59704 20.6497C9.94875 20.9899 10.3999 21.16 10.8512 21.16C11.3024 21.1599 11.7538 20.9899 12.1054 20.6497L13.3685 19.4278C13.5048 19.296 13.6906 19.2358 13.8783 19.2621L15.6184 19.5083C16.5875 19.6454 17.4786 18.9977 17.6477 18.0339L17.9514 16.3029C17.9841 16.1162 18.099 15.9581 18.2664 15.8692L19.8189 15.0455C20.6832 14.5869 21.0237 13.539 20.594 12.6599L19.8222 11.0809ZM8.46409 5.44197C9.67064 5.44197 10.6523 6.4236 10.6523 7.63015C10.6523 8.83671 9.67064 9.81833 8.46409 9.81833C7.25753 9.81833 6.27591 8.83671 6.27591 7.63015C6.27591 6.4236 7.25753 5.44197 8.46409 5.44197ZM7.33465 15.1734C7.21813 15.2899 7.06539 15.3482 6.91269 15.3482C6.75999 15.3482 6.60721 15.2899 6.49073 15.1734C6.25768 14.9403 6.25768 14.5625 6.49073 14.3294L14.3677 6.45242C14.6007 6.21937 14.9786 6.21937 15.2117 6.45242C15.4447 6.68547 15.4447 7.06333 15.2117 7.29638L7.33465 15.1734ZM13.2382 16.1839C12.0317 16.1839 11.0501 15.2023 11.0501 13.9957C11.0501 12.7892 12.0317 11.8075 13.2382 11.8075C14.4448 11.8075 15.4264 12.7892 15.4264 13.9957C15.4264 15.2023 14.4448 16.1839 13.2382 16.1839Z" fill={"#393939"}/>
    </svg>
        <h2 className="text-[#393939] text-lg font-semibold">
          {translate("content.details.offer_heading")}
        </h2>
      </div>

        <button
          onClick={() => onClick(0, ComponentsType.editOfferContent)}
          className="flex gap-x-4 items-center text-[#532d2d] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
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
