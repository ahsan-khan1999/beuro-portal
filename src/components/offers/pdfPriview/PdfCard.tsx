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
import { PostIcon } from "@/assets/svgs/components/post-icon";
import { useTranslation } from "next-i18next";

const EmailCard = ({
  emailStatus,
  offerNo,
  onEmailSend,
  loading,
  onDownload,
  onPrint,
  handleSendByPost,
  activeButtonId,
}: EmailHeaderProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  return (
    <EmailCardLayout>
      <div className="flex flex-col mlg:flex-row justify-between gap-y-3 border-b border-[#000] border-opacity-20 pb-5">
        <div className="flex items-center gap-x-6">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium">
            {translate("offer_pdf_card.offer_detail")}
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <BaseButton
            buttonText={translate("offer_pdf_card.send_post")}
            onClick={handleSendByPost}
            containerClassName="flex items-center group gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "post"}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>
          <BaseButton
            buttonText={translate("offer_pdf_card.send_email")}
            onClick={onEmailSend}
            containerClassName="flex items-center group gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "email"}
            loaderColor="#4A13E7"
          >
            <EmailIcon className="text-primary group-hover:text-primary" />
          </BaseButton>
          
          <IconOnlyButton
            icon={<Image src={downloadIcon} alt="downloadIcon" />}
            onClick={onDownload}
          />
          {/* <IconOnlyButton
            icon={<Image src={printerIcon} alt="printerIcon" />}
            onClick={onPrint}
          /> */}
        </div>
      </div>
      <div className="flex mt-5">
        <div className="flex items-center gap-3 mr-[56px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("offer_pdf_card.offer_id")}:
          </span>

          <span className="text-[#4B4B4B] text-base font-medium">
            {offerNo}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("offer_pdf_card.email_status")}:
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
