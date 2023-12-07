import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import editIcon from "@/assets/svgs/Edit_note.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { InvoiceTableRowTypes } from "@/types/invoice";
import { formatDateTimeToDate } from "@/utils/utility";
const InvoiceDetailsData = ({ handleInvoiceCreation, invoiceDetails, handleNotes }: {
  handleInvoiceCreation: () => void, invoiceDetails: InvoiceTableRowTypes, handleNotes: (item: string,
    e?: React.MouseEvent<HTMLSpanElement>) => void
}) => {
  const router = useRouter()
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image src={backIcon} alt="back_icon" onClick={() => router.push("/invoices")} className="cursor-pointer" />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            Invoice details
          </p>
        </div>

        <button
          onClick={() => handleInvoiceCreation()}
          className="px-[13px] py-[9px] bg-[#4A13E7] text-white font-semibold text-[13px] leading-4 rounded-md flex gap-[5px]"
        >
          <Image src={plusIcon} alt="plusIcon" />
          <span>Create Invoice</span>
        </button>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-y-3 xl:gap-y-0">
        <div className="flex flex-col gap-[17px]">
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Invoice ID:
            </span>
            <span className="text-[#393939] font-medium text-base">{invoiceDetails.invoiceNumber}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Contract ID:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">{invoiceDetails.contractID?.contractNumber}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Offer ID:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">{invoiceDetails.contractID?.offerID?.offerNumber}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[17px]">
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Invoice Title:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails.contractID?.offerID?.title}
            </span>
          </div>
          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                Worker:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {invoiceDetails.contractID?.offerID?.customerID?.fullName}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                Email Status:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {invoiceDetails?.sentEmail + "/" + invoiceDetails?.totalEmail + " Sent"}
              </span>
            </div>
          </div>

          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2 items-center">
              <span className="text-base font-normal text-[#4D4D4D]">
                Creation Date:
              </span>
              <span className="text-[#393939] font-medium text-base">
                {formatDateTimeToDate(invoiceDetails?.createdAt)}
              </span>
            </div>
            <div className="flex gap-2 items-center" onClick={(e) => handleNotes(invoiceDetails?.id, e)}>
              <span className="text-base font-normal text-[#4D4D4D]">
                Notes:
              </span>
              <Image src={editIcon} alt="editIcon" className="cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-[#dcdcdc] rounded-md shadow-md p-[18px]">
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4A13E7]">
              Total Amount:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">
              {invoiceDetails?.contractID?.offerID?.total}
            </span>
          </div>
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              Paid Amount:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails?.paidAmount} CHF
            </span>
          </div>
          <div className="flex gap-x-[10px] pt-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              Unpaid Amount:
            </span>
            <span className="text-[#393939] font-medium text-base">
              {invoiceDetails?.remainingAmount} CHF
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetailsData;
