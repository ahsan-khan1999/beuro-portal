import React from "react";
import Image from "next/image";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import backIcon from "@/assets/svgs/back_icon.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { TableRowEmailTracker } from "@/types/emailTracker";
import { formatDateString, isNumber } from "@/utils/functions";
import { formatDateReverse } from "@/utils/utility";
import Link from "next/link";

const DetailsData = ({
  handleConfirmDeletion,
  emailDetails,
}: {
  handleConfirmDeletion: Function;
  emailDetails: TableRowEmailTracker | null;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            onClick={() => router.push("/email-tracker")}
            className="cursor-pointer"
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("email_tracker.card_content.main_heading")}
          </h1>
        </div>
        <div className="flex items-center gap-x-5">
         
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            className="cursor-pointer"
            onClick={() => handleConfirmDeletion()}
          />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="xl:w-11/12 w-full">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
          <div>
            <span className="font-normal text-[#4D4D4D]  text-base mr-5">
              {translate("email_tracker.card_content.id")}
            </span>
            <span className="font-medium  text-[#4B4B4B] text-base">
              {emailDetails?.id && emailDetails.id.slice(-5)}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              {translate("email_tracker.card_content.status")}:
            </span>
            <span
              className={`font-medium text-base text-white px-2 py-1 text-center rounded-md  min-w-[70px] bg-[${emailDetails?.mailStatus === "opend"
                  ? "#45C769"
                  : emailDetails?.mailStatus === "pending"
                    ? "#FE9244"
                    : "#FF376F"
                }]`}>
              {emailDetails?.mailStatus}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D]  text-base mr-5">
              {translate("email_tracker.card_content.subject")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {emailDetails?.subject}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              {translate("email_tracker.card_content.recipient")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base break-all">
              {emailDetails?.email}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              {translate("email_tracker.card_content.send_at")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {formatDateReverse(emailDetails?.createdAt as string)}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D]  text-base mr-5">
              {translate("email_tracker.card_content.viewed_at")}:
            </span>
            <span className="font-medium text-[#4B4B4B]  text-base">
              {formatDateReverse(emailDetails?.viewedAt as string)}
            </span>
          </div>
        </div>

        <div className="my-5">
          <span className="text-[#4B4B4B] text-lg  font-semibold ">
            {translate("email_tracker.card_content.attachments")}:
          </span>
        </div>
        {emailDetails?.attachments?.map((item) => {
          let length = item?.href?.split("/")?.length - 1;

          return (
            <div className="my-5 flex items-end">
              <Link
                href={item?.href || ""}
                target="_blank"
                className="border-[1px] py-2 px-[10px]  rounded-lg border-[#C7C7C7] flex items-center">
                <Image
                  src={pdfFileIcon}
                  alt="PDF_FILE_ICON"
                  className=" mr-[11px]"
                />
                <span className="text-[#BFBFBF] text-base font-normal">
                  {/* {item.href?.length > 15
                    ? `${item.href.slice(0, 15)}...`
                    : item.href} */}
                  { item.href?.split("/")[length - 1]}
                </span>
              </Link>
              &nbsp;,&nbsp;
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailsData;
