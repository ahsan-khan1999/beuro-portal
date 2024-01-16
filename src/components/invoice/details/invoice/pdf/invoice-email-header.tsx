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
import { useAppSelector } from "@/hooks/useRedux";
import { getInvoiceStatusColor } from "@/utils/utility";

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
  const { collectiveInvoiceDetails } = useAppSelector((state) => state.invoice);
  const color = getInvoiceStatusColor(
    collectiveInvoiceDetails?.invoiceStatus
  )
  return (
    <PdfCardLayout>
      <div className="flex justify-between items-center border-b border-[#000] border-opacity-20 pb-5">
        <div className="flex justify-between flex-col xlg:flex-row w-full gap-y-4">
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
          <div className="flex items-center gap-5">
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
              buttonText={translate(
                "contracts.pdf_card_details.send_via_email"
              )}
              onClick={onEmailSend}
              containerClassName="flex items-center gap-x-3 row-reverse group"
              textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
              loading={loading && activeButtonId === "email"}
              loaderColor="#4A13E7"
            >
              <EmailIcon className="text-primary group-hover:text-primary" />
            </BaseButton>

            <Image
              src={downloadIcon}
              alt="downloadIcon"
              className="cursor-pointer"
              onClick={onDownload}
            />
            {/* <Image
            src={printerIcon}
            alt="printerIcon"
            className="cursor-pointer"
            onClick={onPrint}
          /> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xLarge:grid-cols-2 items-center gap-y-3 gap-x-10 mt-5">
        <div className="flex justify-between">
          <div>
            <span className="text-base font-normal text-[#4D4D4D] mr-[10px]">
              {translate("invoice.card_content.invoice_number")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {collectiveInvoiceDetails?.invoiceID?.invoiceNumber}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[#4D4D4D] break-all">
              {translate("invoice.table_headings.title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
              {
                collectiveInvoiceDetails
                  ?.title
              }
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              {translate("invoice.table_headings.status")}
            </span>

            <span className={`text-base font-medium text-[${color}] border border-[${color}] rounded-lg px-4  `}>
              {collectiveInvoiceDetails?.invoiceStatus}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              {translate("invoice.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {
                collectiveInvoiceDetails?.invoiceID?.contractID?.offerID
                  ?.createdBy?.fullName
              }
            </span>
          </div>
        </div>
      </div>
    </PdfCardLayout>
  );
};
