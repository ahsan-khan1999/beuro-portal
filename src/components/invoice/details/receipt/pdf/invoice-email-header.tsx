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
import { InvoicesIcon } from "@/assets/svgs/components/sideBar/Invoices";

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
  const color = getInvoiceStatusColor(collectiveInvoiceDetails?.invoiceStatus);
  return (
    <div className="mb-5">
      <PdfCardLayout>
        <div className="flex justify-between items-center border-b border-[#000] border-opacity-10 pb-5">
          <div className="flex items-center">
            <Image
              src={backIcon}
              alt="backIcon"
              className="cursor-pointer"
              onClick={() => {
                router.push({
                  pathname: "/invoices/details",
                  query: { invoice: collectiveInvoiceDetails?.invoiceID?.id },
                });
              }}
            />
            <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
              {title}
            </h1>
          </div>
          <div className="flex items-center justify-between gap-5">
            <BaseButton
              id="sendPostButton"
              buttonText={translate(title)}
              onClick={() => {
                router.push({
                  pathname: "/invoices/details",
                  query: { invoice: collectiveInvoiceDetails?.invoiceID?.id },
                });
              }}
              containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
              textClassName="text-[#4B4B4B] font-medium group-hover:text-primarborder "
            >
              <InvoicesIcon pathClass="#4A13E7" />
            </BaseButton>
            <BaseButton
              id="sendPostButton"
              buttonText={title}
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
        <div className="grid grid-cols-1 xLarge:grid-cols-2 items-center gap-y-3 gap-x-10 mt-5">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D] mr-[10px]">
                {translate("invoice.card_content.receipt_number")}:
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {collectiveInvoiceDetails?.invoiceID?.invoiceNumber}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D] break-all">
                {translate("content.details.receipt_title")}:
              </span>

              <span className="text-base font-medium text-[#4B4B4B] flex">
                {collectiveInvoiceDetails?.title}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-base  font-normal text-[#4D4D4D]">
                {translate("contracts.table_headings.status")}:
              </span>

              <span
                className={`text-base font-medium text-[${color}] border border-[${color}] rounded-lg px-4`}
              >
                {collectiveInvoiceDetails?.invoiceStatus}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("contracts.card_content.worker")}:
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {
                  collectiveInvoiceDetails?.invoiceID?.createdBy?.fullName
                }
              </span>
            </div>
          </div>
        </div>
      </PdfCardLayout>
    </div>
  );
};
