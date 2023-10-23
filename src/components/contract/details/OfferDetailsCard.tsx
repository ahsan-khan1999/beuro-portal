import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import colorFullEmailIcon from "@/assets/svgs/color_ful_input_email.svg";
import editIcon from "@/assets/svgs/name-input.svg";
import writeIcon from "@/assets/svgs/write_icon.svg";
import imageIcon from "@/assets/svgs/edit_image.svg";

const OfferDetailsCard = () => {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image src={backIcon} alt="back_icon" className="w-10 h-10" />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            Offer details
          </p>
        </div>

        <div className="flex gap-[22px]">
          <div className="w-fit border-[1px] border-[#C7C7C7] rounded-lg flex px-4 py-[6px] ">
            <Image src={colorFullEmailIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px]">
              Send Email
            </p>
          </div>
          <Image src={PDFIcon} alt="PDFIcon" />
          <Image src={downloadIcon} alt="downloadIcon" />
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div className="flex flex-col gap-4">
        {/* first div is here */}
        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)]">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              Offer ID:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">A-2000</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Offer Title:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
              Office Cleaning Munich Lorem Ipsum dollar
              <Image src={editIcon} alt="editIcon" className="cursor-pointer" />
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Worker:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              Ahamad Rahal Ali
            </span>
          </div>
        </div>
        {/* Secod div is here */}
        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(450px,_450px)_minmax(130px,_100%)]">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              Creation Date:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              25/08/2023
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Service Date:
            </span>
            <div className="flex gap-1">
              <span className="text-base font-medium text-[#4B4B4B]">
                25/08 to 25/08
              </span>
              <Image src={editIcon} alt="editIcon" className="cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(350px,_350px)_minmax(300px,_100%)_minmax(200px,_250px)_minmax(120px,_120px)_minmax(120px,_120px)]">
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              Email Status:
            </span>
            <span className="text-base font-medium text-[#FE9244] border border-[#FE9244] rounded-lg px-4 py-[3px] cursor-pointer">
              Draft
            </span>
          </div>
          <div className="flex items-center gap-[11px] ">
            <span className="text-[#4D4D4D] font-normal text-base">
              Payment Method:
            </span>
            <span className="text-base font-medium text-[#45C769] border border-[#45C769] rounded-lg px-4 py-[3px] flex items-center cursor-pointer">
              Cash
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M0.508731 1.13825C0.691692 0.973166 0.908319 0.890624 1.15861 0.890624C1.4089 0.890624 1.62529 0.973166 1.80776 1.13825L7.16854 5.97518L12.5476 1.12174C12.7184 0.967664 12.9318 0.890625 13.188 0.890625C13.4441 0.890625 13.6637 0.973167 13.8467 1.13825C14.0296 1.30333 14.1211 1.49879 14.1211 1.72462C14.1211 1.95046 14.0296 2.1457 13.8467 2.31034L7.68084 7.85713C7.60765 7.92316 7.52837 7.97005 7.44299 7.99778C7.3576 8.02552 7.26612 8.03916 7.16854 8.03872C7.07096 8.03872 6.97948 8.02486 6.8941 7.99712C6.80872 7.96939 6.72943 7.92272 6.65625 7.85713L0.490435 2.29383C0.319671 2.13975 0.234288 1.9498 0.234288 1.72396C0.234288 1.49813 0.325768 1.30289 0.508731 1.13825Z"
                  fill="#45C769"
                />
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              Status:
            </span>
            <span className="text-base font-medium text-[#FF0000] border border-[#FF0000] rounded-lg px-4 py-[3px] flex items-center cursor-pointer">
              Rejected
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M0.464786 1.13825C0.647747 0.973166 0.864374 0.890624 1.11467 0.890624C1.36496 0.890624 1.58134 0.973166 1.76381 1.13825L7.1246 5.97518L12.5037 1.12174C12.6744 0.967664 12.8879 0.890625 13.144 0.890625C13.4002 0.890625 13.6197 0.973167 13.8027 1.13825C13.9857 1.30333 14.0771 1.49879 14.0771 1.72462C14.0771 1.95046 13.9857 2.1457 13.8027 2.31034L7.63689 7.85713C7.56371 7.92316 7.48442 7.97005 7.39904 7.99778C7.31366 8.02552 7.22218 8.03916 7.1246 8.03872C7.02702 8.03872 6.93554 8.02486 6.85015 7.99712C6.76477 7.96939 6.68549 7.92272 6.6123 7.85713L0.446489 2.29383C0.275725 2.13975 0.190343 1.9498 0.190343 1.72396C0.190343 1.49813 0.281823 1.30289 0.464786 1.13825Z"
                  fill="#FF0000"
                />
              </svg>
            </span>
          </div>

            <div>
              <div className="flex items-center gap-[11px]">
                <span className="text-[#4D4D4D] font-normal text-base">
                  Notes:
                </span>
                <Image
                  src={writeIcon}
                  alt="writeIcon"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-[11px]">
                <span className="text-[#4D4D4D] font-normal text-base">
                  Images:
                </span>
                <Image
                  src={imageIcon}
                  alt="editImg"
                  className="cursor-pointer"
                />
              </div>
            </div>
         
        </div>
      </div>
    </>
  );
};

export default OfferDetailsCard;
