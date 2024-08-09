import React from "react";
import Image from "next/image";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import { useRouter } from "next/router";
import { TableRowEmailTracker } from "@/types/emailTracker";
import {
  formatDateReverse,
  getFileNameFromUrl,
  getMailStatusColor,
} from "@/utils/utility";
import Link from "next/link";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";

const DetailsData = ({
  handleConfirmDeletion,
  emailDetails,
}: {
  handleConfirmDeletion: Function;
  emailDetails: TableRowEmailTracker | null;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    (router.pathname = "/email-tracker"), delete router.query["email"];
    updateQuery(router, router.locale as string);
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-b-[#000] border-opacity-10 pb-5">
        <div className="flex items-center">
          <span onClick={handleBack} className="cursor-pointer">
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
            {translate("email_tracker.card_content.main_heading")}
          </h1>
        </div>
        <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center ">
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            className="cursor-pointer"
            onClick={() => handleConfirmDeletion()}
            width={16}
            height={20}
          />
        </span>
      </div>

      <div className="w-full mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <div className="flex items-center gap-x-2">
            <span className="font-normal text-[#4D4D4D] text-base">
              {translate("email_tracker.card_content.id")}:
            </span>
            <span className="font-medium text-primary text-base">
              {emailDetails?.id && emailDetails.id.slice(-5)}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="font-normal text-[#4D4D4D] text-base">
              {translate("email_tracker.card_content.status")}:
            </span>
            {emailDetails?.mailStatus && (
              <span
                className={`font-medium text-base text-white px-2 py-1 text-center rounded-md min-w-[70px] bg-[${getMailStatusColor(
                  emailDetails?.mailStatus || ""
                )}]`}
              >
                {translate(`mail_tracker_status.${emailDetails?.mailStatus}`)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <span className="font-normal text-[#4D4D4D] text-base">
              {translate("email_tracker.card_content.subject")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base truncate">
              {emailDetails?.subject}
            </span>
          </div>

          <div className="flex items-center gap-x-2">
            <span className="font-normal text-[#4D4D4D] text-base">
              {translate("email_tracker.card_content.recipient")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base truncate">
              {emailDetails?.email}
            </span>
          </div>
          {emailDetails?.cc && (
            <div>
              <span className="font-normal text-[#4D4D4D] text-base">Cc:</span>
              <span className="font-medium text-[#4B4B4B] text-base break-all">
                {emailDetails?.cc}
              </span>
            </div>
          )}
          {emailDetails?.bcc && (
            <div>
              <span className="font-normal text-[#4D4D4D] text-base">Bcc:</span>
              <span className="font-medium text-[#4B4B4B] text-base break-all">
                {emailDetails?.bcc}
              </span>
            </div>
          )}
          <div>
            <span className="font-normal text-[#4D4D4D] text-base">
              {translate("email_tracker.card_content.send_at")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {formatDateReverse(emailDetails?.createdAt as string)}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base">
              {translate("email_tracker.card_content.viewed_at")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {formatDateReverse(emailDetails?.viewedAt as string) || "-"}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <span className="text-[#4B4B4B] text-lg font-semibold">
            {translate("email_tracker.card_content.attachments")}:
          </span>
        </div>
        <div className="mt-5 flex items-end">
          {emailDetails?.attachments?.map((item) => {
            return (
              <>
                <Link
                  href={typeof item === "string" ? item : item?.href}
                  target="_blank"
                  className="border-[1px] py-2 px-[10px] rounded-lg border-[#C7C7C7] flex items-center"
                >
                  <Image
                    src={pdfFileIcon}
                    alt="PDF_FILE_ICON"
                    className="mr-[11px]"
                  />
                  <span className="text-[#BFBFBF] text-base font-normal">
                    {getFileNameFromUrl(
                      typeof item === "string" ? item : item?.href,
                      typeof item === "string"
                        ? item?.length
                        : item?.href?.length
                    )}
                  </span>
                </Link>
                &nbsp;&nbsp;
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DetailsData;
