import React from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import { getInvoiceStatusColor } from "@/utils/utility";
import { PrimaryPDF } from "@/assets/svgs/components/primary-pdf";

const MailDetailsCard = () => {
  const router = useRouter();
  const { invoiceDetails, collectiveInvoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const { t: translate } = useTranslation();
  const color = getInvoiceStatusColor(collectiveInvoiceDetails?.invoiceStatus);
  return (
    <>
      <div className="flex justify-between items-center border-b border-[#000] border-opacity-10 pb-5">
        <div className="flex items-center">
          <span
            className="cursor-pointer"
            onClick={() => {
              router.push({
                pathname: "/invoices/details",
                query: { invoice: invoiceDetails?.id },
              });
            }}
          >
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
          <p className="font-medium text-2xl ml-[27px]">
            {translate("invoice.card_content.heading")}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <PrimaryPDF
            onClick={() =>
              router.push({
                pathname: "/invoices/invoice-pdf-preview/",
                query: {
                  invoiceID: collectiveInvoiceDetails?.id,
                  isMail: true,
                },
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

              {collectiveInvoiceDetails?.invoiceID?.invoiceStatus && (
                <span
                  className={`text-base font-medium text-[${color}] border border-[${color}] rounded-lg px-4  `}
                >
                  {collectiveInvoiceDetails?.invoiceID?.invoiceStatus}
                </span>
              )}
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
