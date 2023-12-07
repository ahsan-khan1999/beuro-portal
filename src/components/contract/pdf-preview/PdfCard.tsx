import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import postIcon from "@/assets/svgs/post_icon.svg";
import emailIcon from "@/assets/svgs/color_ful_input_email.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import { useRouter } from "next/router";

const PdfCard = () => {
  const router = useRouter();
  return (
    <div className="rounded-md bg-white py-[20px] px-[20px] w-full h-fit">
      <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-y-5">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={() => router.push("/contract/compose-mail")}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Contract Details
          </h1>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="border-[#C7C7C7] border  rounded-lg px-[13px] py-[7px] flex justify-between items-center cursor-pointer">
            <Image src={postIcon} alt="postIcon" />
            <span className="text-[#4B4B4B] text-base font-medium ml-[11px]">
              Send via Post
            </span>
          </div>
          <div className="border-[#C7C7C7] border  rounded-lg px-[13px] py-[7px] flex justify-between items-center cursor-pointer">
            <Image src={emailIcon} alt="postIcon" />
            <span className="text-[#4B4B4B] text-base font-medium ml-[11px]">
              Send via Email
            </span>
          </div>

          <Image
            src={downloadIcon}
            alt="downloadIcon"
            className="cursor-pointer"
          />
          <Image
            src={printerIcon}
            alt="printerIcon"
            className="cursor-pointer"
          />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex flex-col xl:flex-row justify-between xl:flex-wrap gap-y-2">
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            Contract ID:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">A-2000</span>
        </div>
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">Worker:</span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">Rahal</span>
        </div>
        <div>
          <span className="text-[#4D4D4D] text-base font-normal">
            Content Name:
          </span>
          &nbsp;
          <span className="text-[#4B4B4B] text-base font-medium">
            Anger fur Ihren Umzug, Entsogung inkl.....
          </span>
        </div>
        <div className="flex  items-center gap-[11px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            Contract Status:
          </span>

          <div className="border-[#FE9244] border rounded-lg px-[8px] w-[68px]">
            <span className="text-[#FE9244] text-base font-medium">Open</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
