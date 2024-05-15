import React from "react";
import { useRouter } from "next/router";
import { InvoiceEmailHeaderProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";
import { getInvoiceStatusColor } from "@/utils/utility";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";
import { PrintIcon } from "@/assets/svgs/components/print-icon";

export const InvoiceEmailHeader = ({
  onDownload,
  onPrint,
}: InvoiceEmailHeaderProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { invoiceDetails } = useAppSelector((state) => state.invoice);

  const color = getInvoiceStatusColor(invoiceDetails?.invoiceStatus);

  return (
    <div className="rounded-md bg-white py-[20px] px-[20px] w-full h-fit">
      <div className="flex justify-between items-center border-b border-[#000] border-opacity-10 pb-5 gap-y-5">
        <button
          onClick={() => {
            router.push({
              pathname: "/invoices/details",
              query: {
                ...router.query,
                invoice: invoiceDetails?.id,
              },
            });
          }}
          className=" text-[#4B4B4B] hover:text-primary flex items-center gap-x-3 border border-primary rounded-lg py-2 px-3 cursor-pointer w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="17"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path
              d="M8.1165 1.07827C8.30043 1.26226 8.40376 1.51176 8.40376 1.77191C8.40376 2.03207 8.30043 2.28157 8.1165 2.46555L3.26003 7.32203L8.1165 12.1785C8.29522 12.3635 8.39411 12.6114 8.39187 12.8686C8.38964 13.1259 8.28645 13.3719 8.10455 13.5538C7.92264 13.7357 7.67657 13.8389 7.41933 13.8412C7.16208 13.8434 6.91426 13.7445 6.72922 13.5658L1.1791 8.01567C0.995171 7.83169 0.891845 7.58218 0.891845 7.32203C0.891845 7.06187 0.995171 6.81237 1.1791 6.62839L6.72922 1.07827C6.9132 0.894341 7.16271 0.791016 7.42286 0.791016C7.68301 0.791016 7.93252 0.894342 8.1165 1.07827Z"
              fill="#4A13E7"
            />
          </svg>
          <span className="text-xl font-medium">
            {translate("offers.table_headings.edit")}
          </span>
        </button>

        <h1 className="hidden xlgg:flex items-center font-medium text-2xl">
          {translate("invoice.card_content.heading")}
        </h1>

        {/* <div className="flex items-center justify-end gap-x-5"> */}
        {/* <BaseButton
            id="sendPostButton"
            buttonText={translate("contracts.pdf_card_details.send_via_post")}
            onClick={onSendViaPost}
            containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "post"}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>
          <BaseButton
            buttonText={
              invoiceDetails?.emailStatus === "Sent"
                ? translate("common.send_again")
                : translate("contracts.pdf_card_details.send_via_email")
            }
            onClick={onEmailSend}
            containerClassName="flex items-center gap-x-3 row-reverse group border border-primary"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "email"}
            loaderColor="#4A13E7"
          >
            <EmailIcon className="text-primary group-hover:text-primary" />
          </BaseButton> */}
        <div className="flex items-center gap-x-5">
          <PrintIcon onClick={onPrint} />
          <DownloadIcon onClick={onDownload} />
        </div>

        {/* </div> */}
      </div>
      <div className="grid grid-cols-1 xLarge:grid-cols-2 items-center gap-y-3 gap-x-10 mt-5">
        <div className="flex items-center gap-[10px]">
          <span className="text-base font-normal text-[#4D4D4D] mr-[10px] min-w-[130px]">
            {translate("invoice.card_content.invoice_number")}:
          </span>
          <span className="text-base font-medium text-[#4B4B4B] min-w-[70px]">
            {invoiceDetails?.invoiceNumber}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-base font-normal text-[#4D4D4D] min-w-[100px]">
            {translate("invoice.table_headings.title")}:
          </span>

          <span className="text-base font-medium text-[#4B4B4B] truncate">
            {invoiceDetails?.title}
          </span>
        </div>

        <div className="flex items-center gap-[10px]">
          <span className="text-base font-normal text-[4D4D4D]">
            {translate("invoice.table_headings.status")}
          </span>

          {invoiceDetails?.invoiceStatus && (
            <span
              className={`text-base font-medium text-[${color}] border border-[${color}] rounded-lg px-4  `}
            >
              {translate(`invoice_status.${invoiceDetails?.invoiceStatus}`)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-base font-normal text-[4D4D4D]">
            {translate("invoice.card_content.worker")}:
          </span>
          <span className="text-base font-medium text-[#4B4B4B]">
            {invoiceDetails?.createdBy?.fullName}
          </span>
        </div>
      </div>
    </div>
  );
};
