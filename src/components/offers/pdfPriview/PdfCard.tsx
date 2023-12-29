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
import { EmailIcon } from "@/assets/svgs/components/email-icon";

const EmailCard = ({
  emailStatus,
  offerNo,
  onEmailSend,
  loading,
  onDownload,
  onPrint
}: EmailHeaderProps) => {
  const router = useRouter();
  return (
    <EmailCardLayout>
      <div className="flex justify-between items-center max">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Offer Details
          </h1>
        </div>

        <div className="flex items-center justify-between gap-5">
          <BaseButton
            buttonText="Send Email"
            onClick={onEmailSend}
            containerClassName="flex items-center group gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-white"
            loading={loading}
            loaderColor="#4A13E7"
          >
          <EmailIcon className="text-primary group-hover:text-white"/>
          </BaseButton>

          <IconOnlyButton
            icon={<Image src={downloadIcon} alt="downloadIcon" />}
            onClick={onDownload}
          />
          <IconOnlyButton
            icon={<Image src={printerIcon} alt="printerIcon" />}
            onClick={onPrint}
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
