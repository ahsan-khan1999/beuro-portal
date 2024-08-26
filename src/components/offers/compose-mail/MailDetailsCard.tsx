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

const MailDetailsCard = () => {
  const router = useRouter();
  return (
    <ContractCardLayout>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.push("/offers")}
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            Offer details
          </p>
        </div>

        <div className="flex gap-x-[22px]">
          <Image
            src={PDFIcon}
            alt="PDFIcon"
            className="cursor-pointer"
            onClick={() => router.push("/contract/pdf-preview")}
          />
          <Image src={downloadIcon} alt="downloadIcon" />
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" />
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
            <span className="text-base font-medium text-[#4B4B4B]">V-2000</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Offer Title:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
              Office Cleaning
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
              Offer ID:
            </span>
            <span className="text-base font-medium text-[#4A13E7]">A-2000</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Creation Date:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                25/08 2023
              </span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              Service Date:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                25/08 to 25/08
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
              Signed
            </span>
          </div>
          <div className="flex items-center gap-[11px] ">
            <span className="text-[#4D4D4D] font-normal text-base">
              Payment Method:
            </span>
            <span className="text-base font-medium text-[#45C769] border border-[#45C769] rounded-lg px-4 py-[3px] flex items-center cursor-default">
              Cash
            </span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              Status:
            </span>
            <span className="text-base font-medium text-[#FE9244] border border-[#FE9244] rounded-lg px-4 py-[3px] flex items-center cursor-default">
              Open
            </span>
          </div>

          <div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                Notes:
              </span>
              <Image src={writeIcon} alt="writeIcon" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                Images:
              </span>
              <Image src={imageIcon} alt="editImg" />
            </div>
          </div>
        </div>
      </div>
    </ContractCardLayout>
  );
};

export default MailDetailsCard;
