import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import editIcon from "@/assets/svgs/Edit_note.svg";
import Image from "next/image";
import { useRouter } from "next/router";
const InvoiceDetailsData = ({ handleInvoiceCreation } : {handleInvoiceCreation: Function}) => {
  const router = useRouter()
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image src={backIcon} alt="back_icon" onClick={() => router.push("/invoices")} className="cursor-pointer"/>
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            Invoice details
          </p>
        </div>

        <button
          onClick={() => handleInvoiceCreation(true)}
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
            <span className="text-[#393939] font-medium text-base">R-2000</span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Contract ID:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">V-2000</span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Offer ID:
            </span>
            <span className="text-[#4A13E7] font-medium text-base">A-2000</span>
          </div>
        </div>

        <div className="flex flex-col gap-[17px]">
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              Invoice Title:
            </span>
            <span className="text-[#393939] font-medium text-base">
              Office Cleaning Munich Lorem Ipsum dollar
            </span>
          </div>
          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                Worker:
              </span>
              <span className="text-[#393939] font-medium text-base">
                Hassam
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-base font-normal text-[#4D4D4D]">
                Email Status:
              </span>
              <span className="text-[#393939] font-medium text-base">
                3/5 Send
              </span>
            </div>
          </div>

          <div className="flex gap-[44px] items-center">
            <div className="flex gap-2 items-center">
              <span className="text-base font-normal text-[#4D4D4D]">
                Creation Date:
              </span>
              <span className="text-[#393939] font-medium text-base">
                25/08/2023
              </span>
            </div>
            <div className="flex gap-2 items-center">
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
              20000 CHF
            </span>
          </div>
          <div className="flex gap-x-[10px] border-b border-[#000] border-opacity-10 py-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              Paid Amount:
            </span>
            <span className="text-[#393939] font-medium text-base">
              11000 CHF
            </span>
          </div>
          <div className="flex gap-x-[10px] pt-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              Unpaid Amount:
            </span>
            <span className="text-[#393939] font-medium text-base">
              9000 CHF
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetailsData;
