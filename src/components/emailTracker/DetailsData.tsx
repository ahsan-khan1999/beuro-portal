import React from "react";
import Image from "next/image";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import backIcon from "@/assets/svgs/back_icon.svg";

const DetailsData = ({
  handleConfirmDeletion,
}: {
  handleConfirmDeletion: Function;
}) => {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image src={backIcon} alt="backIcon" />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Email Details
          </h1>
        </div>
        <div className="flex items-center gap-x-5">
          <Image
            src={printerIcon}
            alt="printerIcon"
            className="cursor-pointer"
          />
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            className="cursor-pointer"
            onClick={() => handleConfirmDeletion()}
          />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="w-4/5">
        <div className="grid grid-cols-3 gap-5">
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              ID:
            </span>
            <span className="font-medium leading-6 text-[#4B4B4B] text-base">
              01b9H23
            </span>
          </div>
          <div>
            <span className="font-normal leading-6 text-[#4D4D4D] text-base mr-5">
              Status:
            </span>
            <span className="font-medium leading-6 text-base text-white px-2 py-1 text-center rounded-md  w-[70px] bg-[#45C769]">
              Open
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              Subject:
            </span>
            <span className="font-medium text-[#4B4B4B] leading-6 text-base">
              R-2010 Credit Moving Offer
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              Recipient:
            </span>
            <span className="font-medium text-[#4B4B4B] leading-6 text-base">
              Test123@gmail.com
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              Send At:
            </span>
            <span className="font-medium text-[#4B4B4B] leading-6 text-base">
              14:06:44, 25/08/2023
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              Viewed At:
            </span>
            <span className="font-medium text-[#4B4B4B] leading-6 text-base">
              14:06:44, 25/08/2023
            </span>
          </div>
        </div>

        <div className="my-5">
          <span className="text-[#4B4B4B] text-lg leading-6 font-semibold ">
            Attachments:
          </span>
        </div>

        <div className="my-5 flex items-end">
          <button className="border-[1px] py-2 px-[10px]  rounded-lg border-[#C7C7C7] flex items-center">
            <Image
              src={pdfFileIcon}
              alt="PDF_FILE_ICON"
              className=" mr-[11px]"
            />
            <span className=" text-[#BFBFBF] text-base font-normal ">
              Latest Offer
            </span>
          </button>
          &nbsp;,&nbsp;
          <button className="border-[1px] py-2 px-[10px] rounded-lg border-[#C7C7C7] flex items-center">
            <Image
              src={pdfFileIcon}
              alt="PDF_FILE_ICON"
              className=" mr-[11px]"
            />
            <span className=" text-[#BFBFBF] text-base font-normal ">
              Invoice...
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
