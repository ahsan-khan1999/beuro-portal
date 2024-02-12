import React from "react";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import { InvoiceCardContentProps } from "@/types/invoice";
import { formatDateTimeToDate } from "@/utils/utility";
import { Button } from "@/base-components/ui/button/button";
import recurring from "@/assets/svgs/recurring icon.svg";
import { useTranslation } from "next-i18next";
import { WriteIcon } from "@/assets/svgs/components/write-icon";
import { EditIcon } from "@/assets/svgs/components/edit-icon";


const InvoiceDetailsData = ({
  handleInvoiceCreation,
  invoiceDetails,
  handleNotes,
  handleRecurringInvoiceCreation,
  handleEditInvoiceFrequencyCreation,
  handleStopInvoiceCreation,
  handleSendEmail,
  currency,
  handleInvoiceEdit
}: InvoiceCardContentProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 mb-5">
        <div className="flex items-center">
          <span
            onClick={() => router.push("/invoices")}
            className="cursor-pointer"
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
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {translate("invoice.card_content.heading")}
          </p>
        </div>

        {(!invoiceDetails?.isInvoiceRecurring2 && (
          <div className="flex space-x-2">
            <Button
              className="px-[13px] !h-[32px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
              inputType="button"
              text={translate("invoice.receipt_card.edit_invoice")}
              id="editInvoice"
              icon={plusIcon }

              onClick={handleInvoiceEdit}
            />
            <Button
              className="px-[13px] !h-[32px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
              inputType="button"
              text={translate("invoice.card_content.create_invoice_button")}
              id="invoice"
              icon={plusIcon}
              onClick={handleInvoiceCreation}
            />
            <Button
              className="px-[13px] !h-[32px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
              inputType="button"
              text={translate("invoice.card_content.recurring_invoice_button")}
              id="Recurring Invoice"
              icon={recurring}
              onClick={handleRecurringInvoiceCreation}
            />
          </div>
        )) || (
            <div className="flex space-x-2">
              <Button
                className="px-[13px] !h-[32px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
                inputType="button"
                text={translate("invoice.receipt_card.edit_invoice")}
                id="editInvoice"
                icon={plusIcon }

                onClick={handleInvoiceEdit}
              />
              <Button
                className="px-[13px] !h-[32px]  bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
                inputType="button"
                text="Edit Frequency"
                onClick={handleEditInvoiceFrequencyCreation}
                id="freq"
              />
              {!(
                !invoiceDetails?.isInvoiceRecurring &&
                invoiceDetails?.isInvoiceRecurring2
              ) && (
                  <Button
                    className="px-[20px] !h-[32px]  bg-red text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
                    inputType="button"
                    text="Stop"
                    onClick={handleStopInvoiceCreation}
                    id="freq"
                  />
                )}
            </div>
          )}
      </div>

      <div className="flex flex-col maxSize:flex-row justify-between maxSize:items-center gap-y-3 border-t border-[#000] border-opacity-10 pt-4">
        <div className="flex flex-col gap-[17px]">
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.invoice_id")}:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails.invoiceNumber}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.contract_id")}:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">
              {invoiceDetails.contractID?.contractNumber}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.offer_id")}:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">
              {invoiceDetails.contractID?.offerID?.offerNumber}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[17px]">
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.title")}:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails?.title}
            </span>
          </div>
          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("invoice.card_content.worker")}:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {invoiceDetails.createdBy?.fullName}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("invoice.card_content.status")}:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {invoiceDetails?.sentEmail +
                  "/" +
                  invoiceDetails?.totalEmail +
                  " Sent"}
              </span>
            </div>
          </div>

          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2 items-center">
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("invoice.card_content.created_date")}:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {formatDateTimeToDate(invoiceDetails?.createdAt)}
              </span>
            </div>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={(e) => handleNotes(invoiceDetails?.id, e)}
            >
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("invoice.card_content.notes")}:
              </span>
              <WriteIcon
                pathClass={
                  invoiceDetails?.isNoteCreated ? "#FE9244" : "#4A13E7"
                }
              />
            </div>
          </div>
        </div>

        <div className="w-fit flex flex-col border border-[#dcdcdc] rounded-md shadow-md p-[18px]">
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4A13E7]">
              {translate("invoice.card_content.total_amount")}:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">
              {invoiceDetails?.contractID?.offerID?.total?.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.paid_amount")}:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {Number(invoiceDetails?.paidAmount)?.toFixed(2)} {currency}
            </span>
          </div>
          <div className="flex gap-x-[10px] pt-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.unpaid_amount")}:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {(
                invoiceDetails?.contractID?.offerID?.total -
                Number(invoiceDetails?.paidAmount)
              )?.toFixed(2)}{" "}
              {currency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetailsData;
