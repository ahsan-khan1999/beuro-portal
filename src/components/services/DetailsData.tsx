import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";

const DetailsData = ({
  serviceDetail,
  isUpdate,
  deleteHandler
}: 
{
  serviceDetail: Service;
  isUpdate: boolean;
  deleteHandler: () => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          {isUpdate && (
            <Image
              src={backIcon}
              alt="backIcon"
              className="cursor-pointer"
              onClick={() => router.push("/services")}
            />
          )}
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {isUpdate
              ? "Services Details"
              : `${translate("services.card_content.main_heading")}`}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            onClick={deleteHandler}
            className="cursor-pointer"
          />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div>
        <div className="flex justify-between items-center max-w-[600px]">
          <h3 className="text-[#4D4D4D] ">
            {translate("services.card_content.customer_id")}:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{serviceDetail?.refID}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate("services.card_content.created_by")}:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{serviceDetail?.createdBy?.fullName}
            </span>
          </h3>
        </div>
        {isUpdate && (
          <h3 className="text-[#4D4D4D] mt-4">
            {translate("services.card_content.created_date")}:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{formatDateTimeToDate(serviceDetail?.createdAt)}
            </span>
          </h3>
        )}
      </div>
    </>
  );
};

export default DetailsData;
