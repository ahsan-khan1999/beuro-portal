import React from "react";
import PdfCardLayout from "./PdfCardLayout";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import postIcon from "@/assets/svgs/post_icon.svg";
import emailIcon from "@/assets/svgs/color_ful_input_email.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import { useRouter } from "next/router";
import { InvoiceEmailHeaderProps } from "@/types";

export const InvoiceEmailHeader = ({
  contentName,
  contractId,
  contractStatus,
  workerName,
  loading,
  onDownload,
  onEmailSend,
  onPrint,
  onSendViaPost,
}: InvoiceEmailHeaderProps) => {
  const router = useRouter();
  return (
    <PdfCardLayout>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={() => router.push("/invoices/details")}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Contract Details
          </h1>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="border-[#C7C7C7] border  rounded-lg px-[13px] py-[7px] flex justify-between items-center cursor-pointer">
            <Image src={postIcon} alt="postIcon" />
            <span className="text-[#4B4B4B] text-base font-medium ml-[11px]">
              Send via Post
            </span>
          </div>
          <div
            className="border-[#C7C7C7] border  rounded-lg px-[13px] py-[7px] flex justify-between items-center cursor-pointer"
            onClick={onEmailSend}
          >
            <Image src={emailIcon} alt="postIcon" />
            <span className="text-[#4B4B4B] text-base font-medium ml-[11px]">
              Send via Email
            </span>
          </div>

          <Image src={downloadIcon} alt="downloadIcon" />
          <Image src={printerIcon} alt="printerIcon" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            Contract ID:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            {contractId}
          </span>
        </div>
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">Worker:</span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            {workerName}
          </span>
        </div>
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            Content Name:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            {contentName}
          </span>
        </div>
        <div className="flex items-center gap-[11px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            Contract Status:
          </span>
          <div
            className={`border rounded-lg px-[8px] w-[68px] ${
              contractStatus === "Open" ? "border-[#FE9244]" : ""
            }`}
          >
            <span
              className={`text-base font-medium ${
                contractStatus === "Open" ? "text-[#FE9244]" : ""
              }`}
            >
              {contractStatus}
            </span>
          </div>
        </div>
      </div>
    </PdfCardLayout>
  );
};
