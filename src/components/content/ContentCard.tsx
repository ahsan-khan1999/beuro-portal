import React from "react";
import Image from "next/image";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import { ContentTableRowTypes } from "@/types/content";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import { useTranslation } from "next-i18next";
import { updateQuery } from "@/utils/update-query";

const ContentCard = ({
  contentDetails,
  contentDeleteHandler,
}: {
  contentDetails: ContentTableRowTypes;
  contentDeleteHandler: () => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    router.pathname = "/content";
    delete router.query["content"];
    updateQuery(router, router.locale as string);
  };

  return (
    <div className="rounded-md bg-white w-full">
      <div className="flex justify-between items-center border-b border-[#000] border-opacity-10 pb-5">
        <div className="flex items-center">
          <span className="cursor-pointer" onClick={handleBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
            >
              <rect
                x="0.750977"
                y="0.5"
                width="39.2105"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#4A13E7"
              />
              <path
                d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
                fill="#4A13E7"
              />
            </svg>
          </span>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("content.content_card_detail.heading")}
          </h1>
        </div>
        <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center">
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            className="cursor-pointer"
            onClick={contentDeleteHandler}
            width={16}
            height={20}
          />
        </span>
      </div>
      <div className="grid maxSize:grid-cols-2 gap-y-3 gap-x-6 mt-5">
        <div className="flex items-center gap-2">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("content.content_card_detail.s_no")}:
          </span>
          <span className="text-[#4B4B4B] text-base font-medium">
            {contentDetails?.refID}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4D4D4D] text-base font-normal min-w-[120px]">
            {translate("content.content_card_detail.title")}:
          </span>
          <span className="text-[#4B4B4B] text-base font-medium truncate">
            {contentDetails?.contentName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("content.content_card_detail.worker")}:
          </span>
          <span className="text-[#4B4B4B] text-base font-medium">
            {contentDetails?.createdBy?.fullName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("content.content_card_detail.created_date")}:
          </span>
          <span className="text-[#4B4B4B] text-base font-medium">
            {formatDateString(contentDetails?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
