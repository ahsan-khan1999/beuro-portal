import React from "react";
import EmailCardLayout from "./PdfCardLayout";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import emailIcon from "@/assets/svgs/color_ful_input_email.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import { useRouter } from "next/router";

const EmailCard = () => {
  const router = useRouter();
  return (
    <EmailCardLayout>
      <>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={backIcon}
              alt="backIcon"
              className="cursor-pointer"
              onClick={() => router.push("/offers/details")}
            />
            <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
              Solar EEG
            </h1>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="border-[#C7C7C7] border  rounded-lg px-[13px] py-[7px] flex justify-between items-center ">
              <Image src={emailIcon} alt="postIcon" />
              <span className="text-[#4B4B4B] text-base font-medium ml-[11px]">
                Send Email
              </span>
            </div>

            <Image src={downloadIcon} alt="downloadIcon" />
            <Image src={printerIcon} alt="printerIcon" />
          </div>
        </div>
        <hr className="w-full h-[1px] text-black opacity-10 my-5" />
        <div className="flex">
          <div className="flex items-center gap-3 mr-[56px]">
            <span className="text-[#4D4D4D] text-base font-normal">
              Offer ID:
            </span>

            <span className="text-[#4B4B4B] text-base font-medium">A-2000</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#4D4D4D] text-base font-normal">
              Email Status:
            </span>
            <div className="border-[#FE9244] border rounded-md px-[8px] text-center w-[98px] ">
              <span className="text-[#FE9244] text-base font-medium">
                Pending
              </span>
            </div>
          </div>
        </div>
      </>
    </EmailCardLayout>
  );
};

export default EmailCard;
