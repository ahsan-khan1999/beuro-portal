import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import writeIcon from "@/assets/svgs/write_icon.svg";
import imageIcon from "@/assets/svgs/edit_image.svg";
import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useRedux";

const MailDetailsCard = () => {
  const router = useRouter();
  const { collectiveInvoiceDetails } = useAppSelector(state => state.invoice)
  return (
    <ContractCardLayout>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            Invoice details
          </p>
        </div>

      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div className="flex flex-col gap-4">
        {/* first div is here */}
        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(200px,_100%)_minmax(150px,_230px)_minmax(230px,_230px)]">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              Invoice Number:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">{collectiveInvoiceDetails?.invoiceID?.invoiceNumber}</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Offer Title:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
              {collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.title}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Status
            </span>

            <span className="text-base font-medium text-[#FE9244] border border-[#FE9244] rounded-lg px-4  ">
              {collectiveInvoiceDetails?.invoiceID?.invoiceStatus}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Worker:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
            {collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.createdBy?.fullName}

            </span>
          </div>
        </div>
        {/* Secod div is here */}
       
      </div>
    </ContractCardLayout>
  );
};

export default MailDetailsCard;
