import React from "react";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { updateQuery } from "@/utils/update-query";

const DetailsData = ({
  serviceDetail,
  isUpdate,
  deleteHandler,
}: {
  serviceDetail: Service;
  isUpdate: boolean;
  deleteHandler: () => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    router.pathname = "/services";
    delete router.query["service"];
    updateQuery(router, router.locale as string);
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-b-[#000] border-opacity-10  pb-5">
        <div className="flex items-center">
          {isUpdate && (
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
          )}
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {isUpdate
              ? `${translate("services.heading")}`
              : `${translate("services.card_content.main_heading")}`}
          </h1>
        </div>
        <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center ">
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            onClick={deleteHandler}
            className="cursor-pointer"
            width={16}
            height={20}
          />
        </span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-center max-w-[600px]">
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D]">
              {translate("services.card_content.customer_id")}:
            </span>
            <span className="text-primary font-medium">
              {serviceDetail?.refID}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D]">
              {translate("services.card_content.created_by")}:
            </span>
            <span className="text-[#4B4B4B] font-medium">
              {serviceDetail?.createdBy?.fullName}
            </span>
          </div>
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
