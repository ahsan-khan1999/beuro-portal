import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import editIcon from "@/assets/svgs/Edit_note.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const ReceiptDetailsData = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            onClick={() => router.push("/invoices")}
            className="cursor-pointer"
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {translate("invoice.receipt_details")}
          </p>
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex flex-col gap-[17px] w-[80%]">
        <div className="flex justify-between items-center">
          <div className="flex gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.receipt_id")}:
            </span>
            <span className="text-base text-[#393939] font-medium">
              Q-2000-3
            </span>
          </div>
          <div className="flex gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.receipt_title")}:
            </span>
            <span className="text-base text-[#393939] font-medium">
              Office Cleaning
            </span>
          </div>
          <div className="flex gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.worker")}:
            </span>
            <span className="text-base text-[#393939] font-medium">
              Rahal AHmad
            </span>
          </div>
        </div>
        <div className="flex gap-[208px] items-center">
          <div className="flex gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.contract_id")}:
            </span>
            <span className="text-base text-[#4A13E7] font-medium">V-2000</span>
          </div>
          <div className="flex gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.total_amount")}:
            </span>
            <span className="text-base text-[#393939] font-medium">
              20000 CHF
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.offer_id")}:ReceiptDetailsData
            </span>
            <span className="text-base text-[#4A13E7] font-medium">A-2000</span>
          </div>
          <div className="flex  items-center gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.payment_status")}:
            </span>
            <span className="text-base text-[#45C769] font-medium border border-[#45C769] rounded-md px-[13px] py-[4px]">
              5 Paid
            </span>
          </div>
          <div className="flex  items-center gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.email_status")}:
            </span>
            <span className="text-base text-[#FE9244] font-medium border border-[#FE9244] rounded-md px-[13px] py-[4px]">
              3/5 Send
            </span>
          </div>
          <div className="flex items-center gap-[13px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("invoice.receipt_card.worker")}:
            </span>
            <Image src={editIcon} alt="editIcon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptDetailsData;
