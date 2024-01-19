import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import { ContentTableRowTypes } from "@/types/content";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import { useTranslation } from "next-i18next";

const ContentCard = ({
  contentDetails,
  contentDeleteHandler,
}: {
  contentDetails: ContentTableRowTypes;
  contentDeleteHandler: () => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  return (
    <div className="rounded-md bg-white p-5 w-full min-h-[149px] ">
      <div className="flex justify-between items-center border-b border-[#000] border-opacity-20 pb-5">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={() => router.push("/content")}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("content.content_card_detail.heading")}
          </h1>
        </div>
        <Image
          src={deleteIcon}
          alt="deleteIcon"
          className="cursor-pointer"
          onClick={contentDeleteHandler}
        />
      </div>
      <div className="grid  maxSize:grid-cols-2 gap-y-3 gap-x-6 mt-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="text-[#4D4D4D] text-base font-normal">
              {translate("content.content_card_detail.s_no")}:
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {contentDetails?.refID}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#4D4D4D] text-base font-normal">
              {translate("content.content_card_detail.title")}:
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {contentDetails?.contentName}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="text-[#4D4D4D] text-base font-normal">
              {translate("content.content_card_detail.worker")}:
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {contentDetails?.createdBy?.fullName}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#4D4D4D] text-base font-normal">
              {translate("content.content_card_detail.created_date")}:
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {formatDateString(contentDetails?.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
