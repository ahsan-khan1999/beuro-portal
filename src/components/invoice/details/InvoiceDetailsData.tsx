import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import editIcon from "@/assets/svgs/Edit_note.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { InvoiceCardContentProps } from "@/types/invoice";
import { formatDateTimeToDate } from "@/utils/utility";
import { Button } from "@/base-components/ui/button/button";
import recurring from "@/assets/svgs/recurring icon.svg";
import { useTranslation } from "next-i18next";
import cofirmation_icon from "@/assets/svgs/confirmation_icon.svg";

const InvoiceDetailsData = ({
  handleInvoiceCreation,
  invoiceDetails,
  handleNotes,
  handleRecurringInvoiceCreation,
  handleEditInvoiceFrequencyCreation,
  handleStopInvoiceCreation,
  handleSendEmail,
  currency
}: InvoiceCardContentProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 mb-5">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            onClick={() => router.push("/invoices")}
            className="cursor-pointer"
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {translate("invoice.card_content.heading")}
          </p>
        </div>
        {(!invoiceDetails?.isInvoiceRecurring && (
          <div className="flex space-x-2">
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
              className="px-[13px] !h-[32px]  bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
              inputType="button"
              text="Edit Frequency"
              onClick={handleEditInvoiceFrequencyCreation}
              id="freq"
            />
            <Button
              className="px-[20px] !h-[32px]  bg-red text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
              inputType="button"
              text="Stop"
              onClick={handleStopInvoiceCreation}
              id="freq"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col maxSize:flex-row justify-between maxSize:items-center gap-y-3 border-t border-[#000] border-opacity-20 pt-4">
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
              {invoiceDetails.contractID?.offerID?.title}
            </span>
          </div>
          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("invoice.card_content.worker")}:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {invoiceDetails.contractID?.offerID?.customerID?.fullName}
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
              className="flex gap-2 items-center"
              onClick={(e) => handleNotes(invoiceDetails?.id, e)}
            >
              <span className="text-base font-normal text-[#4D4D4D]">
                {translate("invoice.card_content.notes")}:
              </span>
              <Image src={editIcon} alt="editIcon" className="cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="w-fit flex flex-col border border-[#dcdcdc] rounded-md shadow-md p-[18px]">
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4A13E7]">
              {translate("invoice.card_content.total_amount")}:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">
              {invoiceDetails?.contractID?.offerID?.total}
            </span>
          </div>
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.paid_amount")}:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails?.paidAmount} {currency}
            </span>
          </div>
          <div className="flex gap-x-[10px] pt-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.unpaid_amount")}:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails?.contractID?.offerID?.total -
                Number(invoiceDetails?.paidAmount)}{" "}
              {currency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetailsData;
