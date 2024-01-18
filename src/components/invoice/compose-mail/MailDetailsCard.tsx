import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import { getInvoiceStatusColor } from "@/utils/utility";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";

const MailDetailsCard = () => {
  const router = useRouter();
  const { collectiveInvoiceDetails } = useAppSelector((state) => state.invoice);
  const { t: translate } = useTranslation();
  const color = getInvoiceStatusColor(collectiveInvoiceDetails?.invoiceStatus);
  return (
    <>
      <div className="flex justify-between items-center border-b border-[#000] border-opacity-20 pb-5">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="font-medium text-2xl ml-[27px]">
            {translate("invoice.card_content.heading")}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Image
            src={PDFIcon}
            alt="PDFIcon"
            className="cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/invoices/invoice-pdf-preview/",
                query: { invoiceID: collectiveInvoiceDetails?.id },
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
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
                {collectiveInvoiceDetails?.title}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-[10px]">
              <span className="text-base  font-normal text-[4D4D4D]">
                {translate("invoice.table_headings.status")}
              </span>

              <span
                className={`text-base font-medium text-[${color}] border border-[${color}] rounded-lg px-4  `}
              >
                {collectiveInvoiceDetails?.invoiceID?.invoiceStatus}
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
      </div>
    </>
  );
};

export default MailDetailsCard;
