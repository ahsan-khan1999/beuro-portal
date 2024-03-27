import React from "react";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import { InvoiceCardContentProps } from "@/types/invoice";
import { formatDateTimeToDate } from "@/utils/utility";
import { Button } from "@/base-components/ui/button/button";
import recurring from "@/assets/svgs/recurring icon.svg";
import { useTranslation } from "next-i18next";
import { WriteIcon } from "@/assets/svgs/components/write-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { updateQuery } from "@/utils/update-query";

const InvoiceDetailsData = ({
  handleInvoiceCreation,
  invoiceDetails,
  handleNotes,
  handleRecurringInvoiceCreation,
  handleEditInvoiceFrequencyCreation,
  handleStopInvoiceCreation,
  handleSendEmail,
  currency,
  handleInvoiceEdit,
}: InvoiceCardContentProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    router.pathname = "/invoices";
    delete router.query["invoice"];
    updateQuery(router, router.locale as string);
  };

  console.log("invoiceStatus:", invoiceDetails.invoiceStatus);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 mb-5">
        <div className="flex items-center">
          <span onClick={handleBack} className="cursor-pointer">
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

        {(!invoiceDetails?.isInvoiceRecurring2 && (
          <div className="flex space-x-2">
            {invoiceDetails.invoiceStatus === "Pending" && (
              <BaseButton
                buttonText={translate("invoice.receipt_card.edit_invoice")}
                onClick={() => handleInvoiceEdit && handleInvoiceEdit()}
                containerClassName="px-[13px] !h-[32px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
                textClassName="text-white"
                id="editInvoice"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8694 2.52921C12.2787 2.1441 12.8246 1.93506 13.3849 1.93506C13.9453 1.93506 14.4912 2.1441 14.9005 2.52921L14.9005 2.52929L15.0224 2.64396L15.0225 2.64403C15.4332 3.03072 15.6731 3.56517 15.6731 4.13277C15.6731 4.70037 15.4332 5.23482 15.0225 5.62151L15.0224 5.62159L13.9028 6.67529C13.8999 6.67806 13.897 6.68081 13.8941 6.68352L6.81563 13.3456C6.71969 13.4359 6.60165 13.4993 6.47339 13.5295L3.64006 14.1962C3.38351 14.2565 3.11411 14.1778 2.93043 13.9888C2.74675 13.7998 2.67575 13.5283 2.74341 13.2736L3.45175 10.6069C3.48767 10.4717 3.5607 10.3492 3.66259 10.2533L10.742 3.59029C10.7449 3.5875 10.7479 3.58473 10.7508 3.582L11.8693 2.52929L11.8694 2.52921ZM11.2599 5.16271L4.84652 11.1989L4.51432 12.4495L5.93405 12.1154L12.2906 6.13277L11.2599 5.16271ZM13.3849 5.10284L12.3543 4.13277L12.8973 3.62167C12.8973 3.62164 12.8974 3.62162 12.8974 3.62159C13.0194 3.50683 13.194 3.43506 13.3849 3.43506C13.5759 3.43506 13.7505 3.50683 13.8725 3.62159C13.8725 3.62162 13.8726 3.62164 13.8726 3.62167L13.9943 3.73618C14.1147 3.84956 14.1731 3.99327 14.1731 4.13277C14.1731 4.27225 14.1147 4.41592 13.9943 4.52929C13.9943 4.52932 13.9943 4.52934 13.9943 4.52937L13.3849 5.10284ZM9.09328 13.4661C9.09328 13.0519 9.42906 12.7161 9.84328 12.7161H15.5099C15.9242 12.7161 16.2599 13.0519 16.2599 13.4661C16.2599 13.8803 15.9242 14.2161 15.5099 14.2161H9.84328C9.42906 14.2161 9.09328 13.8803 9.09328 13.4661Z"
                    fill="#fff"
                  />
                </svg>
              </BaseButton>
            )}

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
              icon={plusIcon}
              onClick={handleInvoiceEdit}
            />
            <Button
              className="px-[13px] !h-[32px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
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
              {"V-" + invoiceDetails.invoiceNumber?.split("-")[1]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.card_content.offer_id")}:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">
              {"A-" + invoiceDetails.invoiceNumber?.split("-")[1]}
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
                  invoiceDetails?.isNoteCreated ? "#FF0000" : "#4A13E7"
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
              {invoiceDetails?.total?.toFixed(2)}
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
                invoiceDetails?.total - Number(invoiceDetails?.paidAmount)
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
