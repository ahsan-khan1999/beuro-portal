import React from "react";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import backIcon from "@/assets/svgs/back_icon.svg";
import createOfferIcon from "@/assets/svgs/create_offer_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import Image from "next/image";

const LeadsDetailsCardData = () => {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image src={backIcon} alt="back_icon" className="w-10 h-10" />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {" "}
            Leads Details
          </p>
        </div>

        <div className="flex gap-[22px]">
          <div className="w-fit border-[1px] border-[#C7C7C7] rounded-lg flex px-4 py-[6px] ">
            <Image src={createOfferIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px]">
              Create Offer
            </p>
          </div>
          <Image src={printerIcon} alt="printer_icon" />
          <Image src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="w-4/5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              Lead ID:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">001-1</span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-[10px]">
              Status:
            </span>
            <span className="font-medium text-base text-[#FE9244] px-[14px] py-[6px] text-center rounded-md border-[1px] border-[#FE9244]  w-[70px]">
              Open
            </span>
          </div>

          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              Creation Date:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              25/08/2023
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              Creation by:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              Rahal Ahmad
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadsDetailsCardData;
