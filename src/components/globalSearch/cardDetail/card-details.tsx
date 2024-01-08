import React from "react";
import editNote from "@/assets/svgs/Edit_note.svg";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function CardDetails() {
  const { t: translate } = useTranslation();
  return (
    <div className="pt-5 grid grid-cols-1 xLarge:grid-cols-2 gap-y-5 items-center">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-[17px]">
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("global_search.customer_id")}:
            </span>
            <span className="text-[#393939] text-base font-medium">K-2000</span>
          </div>
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("global_search.phone")}:
            </span>
            <span className="text-[#393939] text-base font-medium">
              +49 123 123 4567
            </span>
          </div>
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("global_search.created_date")}:
            </span>
            <span className="text-[#393939] text-base font-medium">
              25/08/2023
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-[17px]">
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("global_search.name")}:
            </span>
            <span className="text-[#393939] text-base font-medium">
              Mateen Nawaz
            </span>
          </div>
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("global_search.mobile_number")}:
            </span>
            <span className="text-[#393939] text-base font-medium">
              +49 123 123 4567
            </span>
          </div>
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("global_search.address")}:
            </span>
            <span className="text-[#393939] text-base font-medium break-all">
              Mohrenstrasse 37 10117 Berlin
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className=" flex col-span-2 xLarge:justify-center">
          <div className="flex flex-col gap-y-[17px]">
            <div className="flex items-center gap-x-[10px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("global_search.email")}:
              </span>
              <span className="text-[#393939] text-base font-medium break-all">
                Test1234 @gmail.com
              </span>
            </div>
            <div className="flex items-center gap-x-[10px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("global_search.created_by")}:
              </span>
              <span className="text-[#393939] text-base font-medium">
                Mateen
              </span>
            </div>
            <div className="flex items-center justify-center gap-x-[10px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("global_search.notes")}:
              </span>
              <Image
                src={editNote}
                alt="editNote"
                className="cursor-pointer"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full xLarge:justify-end xLarge:col-span-1 -mt-2">
          <div className="rounded-md border border-[#0000001a] p-4 shadow-md text-center w-full xLarge:w-fit">
            <div className="flex flex-col gap-y-2 border-b border-b-[#0000001a] pb-3">
              <span className="text-[#4D4D4D] font-normal text-sm">
                {translate("global_search.paid_amount")}:
              </span>
              <span className="text-[#393939] font-medium text-base">
                11000 CHF
              </span>
            </div>
            <div className="flex flex-col gap-y-2 pt-3">
              <span className="text-[#4D4D4D] font-normal text-sm">
                {translate("global_search.unpaid_amount")}:
              </span>
              <span className="text-[#393939] font-medium text-base">
                11000 CHF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
