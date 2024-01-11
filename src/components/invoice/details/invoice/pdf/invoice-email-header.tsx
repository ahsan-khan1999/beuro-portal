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
import { BaseButton } from "@/base-components/ui/button/base-button";
import { EmailIcon } from "@/assets/svgs/components/email-icon";
import { useTranslation } from "next-i18next";
import { PostIcon } from "@/assets/svgs/components/post-icon";

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
  title,
  activeButtonId,
}: InvoiceEmailHeaderProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  return (
    <PdfCardLayout>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={router.back}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate(title)}
          </h1>
        </div>
        <div className="flex items-center justify-between gap-5">
          <BaseButton
            id="sendPostButton"
            buttonText={translate("contracts.pdf_card_details.send_via_post")}
            onClick={onSendViaPost}
            containerClassName="flex items-center group gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "post"}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>
          <BaseButton
            buttonText={translate("contracts.pdf_card_details.send_via_email")}
            onClick={onEmailSend}
            containerClassName="flex items-center gap-x-3 row-reverse group"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "email"}
            loaderColor="#4A13E7"
          >
            <EmailIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          {/* <Image
            src={downloadIcon}
            alt="downloadIcon"
            className="cursor-pointer"
            onClick={onDownload}
          />
          <Image
            src={printerIcon}
            alt="printerIcon"
            className="cursor-pointer"
            onClick={onPrint}
          /> */}
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("contracts.pdf_card_details.contract_id")}:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            {contractId}
          </span>
        </div>
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("contracts.pdf_card_details.worker")}:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            {workerName}
          </span>
        </div>
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("contracts.pdf_card_details.content_name")}:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            {contentName}
          </span>
        </div>
        <div className="flex items-center gap-[11px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("contracts.pdf_card_details.contract_status")}:
          </span>
          <div className={`border rounded-lg px-[8px]  ${"border-[#FE9244]"}`}>
            <span className={`text-base font-medium ${"text-[#FE9244]"}`}>
              {contractStatus}
            </span>
          </div>
        </div>
      </div>
    </PdfCardLayout>
  );
};
