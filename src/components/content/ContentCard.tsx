import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import { ContentTableRowTypes } from "@/types/content";

const ContentCard = ({
  contentDetail,
}: {
  contentDetail: ContentTableRowTypes;
}) => {
  return (
    <div className="rounded-md bg-white py-[20px] px-[20px] w-full h-fit">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src={backIcon} alt="backIcon" className="cursor-pointer" />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Content details
          </h1>
        </div>
        <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" />
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex justify-between items-center">
        <div className="flex gap-[6px]">
          <span className="text-[#4D4D4D] text-base font-normal">S.no:</span>
          <span className="text-[#4B4B4B] text-base font-medium">
            {contentDetail?.id}
          </span>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            Content Title:
          </span>

          <span className="text-[#4B4B4B] text-base font-medium">
            {contentDetail?.contentTitle}
          </span>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#4D4D4D] text-base font-normal">Worker</span>

          <span className="text-[#4B4B4B] text-base font-medium">
            Ahamad Rahal Ali
          </span>
        </div>
        <div className="flex  items-center gap-[11px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            Creation Date:
          </span>

          <span className="text-[#4B4B4B] text-base font-medium">
            {contentDetail?.createdOn?.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
