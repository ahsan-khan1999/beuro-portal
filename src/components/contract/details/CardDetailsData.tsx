import Image from "next/image";
import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import confirmationIcon from "@/assets/svgs/confirmation_icon.svg";
import pdfIcon from "@/assets/svgs/PDF_icon.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import noteIcon from "@/assets/svgs/Edit_note.svg";
import imgIcon from "@/assets/svgs/edit_image.svg";

const CardDetailsData = () => {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image src={backIcon} alt="back_icon" className="cursor-pointer" />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Contract Details
          </h1>
        </div>
        <div className="flex justify-between items-center gap-[22px]">
          <div className="border border-[#C7C7C7] rounded-lg flex justify-between items-center p-[10px] cursor-pointer">
            <Image src={confirmationIcon} alt="confirmation_icon" />
            <span className="ml-[12px] text-[#4B4B4B] text-base font-medium">
              Send Confirmation
            </span>
          </div>
          <Image src={pdfIcon} alt="PDF_ICON" className="cursor-pointer" />
          <Image
            src={downloadIcon}
            alt="DOWNLOAD_ICON"
            className="cursor-pointer"
          />
          <Image
            src={printerIcon}
            alt="Printer_ICON"
            className="cursor-pointer"
          />
          <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex flex-col gap-y-[17px]">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#4D4D4D] text-base font-normal">
              Contract ID:
            </span>
            <span className="ml-2 text-[#4B4B4B] text-base font-medium">
              V-2000
            </span>
          </div>
          <div>
            <span className="text-[#4D4D4D] text-base font-normal">
              Offer Title:
            </span>
            <span className="ml-2 text-[#4B4B4B] text-base font-medium">
              Office Cleaning Munich Lorem Ipsum dollar
            </span>
          </div>
          <div className="mr-5">
            <span className="text-[#4D4D4D] text-base font-normal">
              Worker:
            </span>
            <span className="ml-2 text-[#4B4B4B] text-base font-medium">
              Ahamad Rahal Ali
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center w-[85%]">
          <div>
            <span className="text-[#4D4D4D] text-base font-normal">
              Offer ID:
            </span>
            <span className="ml-2 text-[#4A13E7] text-base font-medium">
              A-2000
            </span>
          </div>
          <div>
            <span className="text-[#4D4D4D] text-base font-normal">
              Creation Date:
            </span>
            <span className="ml-2 text-[#4B4B4B] text-base font-medium">
              25/08/2023
            </span>
          </div>
          <div >
            <span className="text-[#4D4D4D] text-base font-normal">
              Service Date:
            </span>
            <span className="ml-2 text-[#4B4B4B] text-base font-medium">
              25/08 to 25/08
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] text-base font-normal">
              Offer Status:
            </span>
            <div className=" border border-[#4A13E7] w-[82px] rounded-lg py-[3px] text-center">
              <span className="text-[#4A13E7]  text-base font-medium">
                Signed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] text-base font-normal">
              Payment Method:
            </span>
            <div className=" border border-[#45C769] w-[82px] rounded-lg py-[3px] text-center">
              <span className="text-[#45C769]  text-base font-medium">
                Cash
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[21px]">
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] text-base font-normal">
                Contract Status:
              </span>
              <div className=" border border-[#FE9244] w-[82px] rounded-lg py-[3px] text-center">
                <span className="text-[#FE9244]  text-base font-medium">
                  Open
                </span>
              </div>
            </div>
            <div className="flex gap-[21px]">
              <div className="flex items-center gap-[11px]">
                <span className="text-[#4D4D4D] text-base font-normal">
                  Notes:
                </span>
                <Image src={noteIcon} alt="note_icon" />
              </div>
              <div className="flex items-center gap-[11px]">
                <span className="text-[#4D4D4D] text-base font-normal">
                  Images:
                </span>
                <Image src={imgIcon} alt="note_icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetailsData;
