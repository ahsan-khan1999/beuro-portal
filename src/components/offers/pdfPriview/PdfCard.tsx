import React from "react";
import EmailCardLayout from "./PdfCardLayout";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import emailIcon from "@/assets/svgs/color_ful_input_email.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import { useRouter } from "next/router";
import { IconOnlyButton } from "@/base-components/ui/button/icon-only-button";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { EmailHeaderProps } from "@/types";

const EmailCard = ({
  emailStatus,
  offerNo,
}: EmailHeaderProps) => {
  const router = useRouter();
  const handleSendEmail = () => {
  };
  return (
    <EmailCardLayout>
      <div className="flex justify-between items-center max">
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
          <BaseButton
            buttonText="Send Email"
            onClick={handleSendEmail}
            containerClassName="flex items-center gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium"
          >
            <Image src={emailIcon} alt="postIcon" />
          </BaseButton>

          <IconOnlyButton
            icon={<Image src={downloadIcon} alt="downloadIcon" />}
            onClick={handleSendEmail}
          />
          <IconOnlyButton
            icon={<Image src={printerIcon} alt="printerIcon" />}
            onClick={handleSendEmail}
          />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex">
        <div className="flex items-center gap-3 mr-[56px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            Offer ID:
          </span>

          <span className="text-[#4B4B4B] text-base font-medium">
            {offerNo}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#4D4D4D] text-base font-normal">
            Email Status:
          </span>
          <div className="border-[#FE9244] border rounded-md px-[8px] text-center w-[98px] ">
            <span className="text-[#FE9244] text-base font-medium">
              {emailStatus}
            </span>
          </div>
        </div>
      </div>
    </EmailCardLayout>
  );
};

export default EmailCard;
