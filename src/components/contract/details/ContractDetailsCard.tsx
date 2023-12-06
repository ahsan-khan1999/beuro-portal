import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import cofirmation_icon from "@/assets/svgs/confirmation_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import writeIcon from "@/assets/svgs/write_icon.svg";
import imageIcon from "@/assets/svgs/edit_image.svg";
import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import { useRouter } from "next/router";
import { formatDateTimeToDate } from "@/utils/utility";
import { contractTableTypes } from "@/types/contract";
import { formatDateToCustomString } from "@/utils/functions";
interface ContractDetailCardProps {
  contractDetails: contractTableTypes
  offerDeleteHandler: () => void
  handleNotes: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void
  handleImageUpload: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void
  handleStatusUpdate: (id: string) => void
  handlePaymentStatusUpdate: (id: string) => void

}
const ContractDetailsCard = ({ contractDetails, handleImageUpload, handleNotes, handlePaymentStatusUpdate, handleStatusUpdate, offerDeleteHandler }: ContractDetailCardProps) => {
  const router = useRouter();
  return (
    <ContractCardLayout>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.push("/contract")}
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            Contract details
          </p>
        </div>

        <div className="flex gap-x-[22px]">
          <button
            onClick={() => router.push("/contract/compose-mail")}
            className="w-fit border-[1px] border-[#C7C7C7] rounded-lg flex  items-center px-4 py-[6px] "
          >
            <Image src={cofirmation_icon} alt="create_offer_icon" />
            <span className="font-medium text-[16px] text-[#4B4B4B] ml-[10px]">
              Send Confirmation
            </span>
          </button>
          <Image
            src={PDFIcon}
            alt="PDFIcon"
            className="cursor-pointer"
            onClick={() => router.push("/contract/pdf-preview")}
          />
          <Image src={downloadIcon} alt="downloadIcon" />
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" onClick={offerDeleteHandler}/>
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div className="flex flex-col gap-4">
        {/* first div is here */}
        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)]">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              Contract ID:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">{contractDetails.contractNumber}</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Offer Title:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
              {contractDetails.offerID?.title}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Worker:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {contractDetails.offerID?.customerID?.fullName}

            </span>
          </div>
        </div>
        {/* Secod div is here */}
        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(450px,_450px)_minmax(130px,_100%)]">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              Offer ID:
            </span>
            <span className="text-base font-medium text-[#4A13E7]">            {contractDetails.offerID?.offerNumber}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Creation Date:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                {formatDateToCustomString(contractDetails.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Service Date:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                {contractDetails?.offerID?.date?.map((item) => (`${formatDateTimeToDate(item.startDate)} to ${formatDateTimeToDate(item.endDate)}`))}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(300px,_100%)_minmax(200px,_250px)_minmax(120px,_120px)_minmax(120px,_120px)]">
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              Offer Status:
            </span>
            <span className="text-base font-medium text-[#4A13E7] border border-[#4A13E7] rounded-lg px-4 py-[3px] cursor-default">
              {contractDetails.offerID?.offerStatus}
            </span>
          </div>
          <div className="flex items-center gap-[11px] ">
            <span className="text-[#4D4D4D] font-normal text-base ">
              Payment Method:
            </span>
            <span className="text-base font-medium text-[#45C769] border border-[#45C769] rounded-lg px-4 py-[3px] flex items-center cursor-default">
              {contractDetails.offerID?.paymentType}

            </span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              Status:
            </span>
            <span className="text-base font-medium text-[#FE9244] border border-[#FE9244] rounded-lg px-4 py-[3px] flex items-center cursor-default">
              {contractDetails.contractStatus}

            </span>
          </div>

          <div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                Notes:
              </span>
              <Image src={writeIcon} alt="writeIcon" className="cursor-pointer" onClick={(e) => handleNotes(contractDetails?.id, e)}/>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                Images:
              </span>
              <Image src={imageIcon} alt="editImg" className="cursor-pointer" onClick={(e) => handleImageUpload(contractDetails?.id, e)} />
            </div>
          </div>
        </div>
      </div>
    </ContractCardLayout>
  );
};

export default ContractDetailsCard;
