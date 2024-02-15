import React from "react";
import EmailCardLayout from "./PdfCardLayout";
import Image from "next/image";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import { useRouter } from "next/router";
import { IconOnlyButton } from "@/base-components/ui/button/icon-only-button";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { EmailHeaderProps } from "@/types";
import { EmailIcon } from "@/assets/svgs/components/email-icon";
import { PostIcon } from "@/assets/svgs/components/post-icon";
import { useTranslation } from "next-i18next";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";
import { OffersIcon } from "@/assets/svgs/components/sideBar/Offers";

const EmailCard = ({
  emailStatus,
  offerNo,
  onEmailSend,
  loading,
  onDownload,
  onPrint,
  handleSendByPost,
  activeButtonId,
  offerId,
}: EmailHeaderProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <EmailCardLayout>
      <div className="flex flex-col mlg:flex-row justify-between gap-y-3 border-b border-[#000] border-opacity-10 pb-5">
        {/* <span
            className="cursor-pointer"
            onClick={() => {
              router.push({
                pathname: "/offers/details",
                query: { offer: offerId },
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
            >
              <rect
                x="0.750977"
                y="0.5"
                width="39.2105"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#4A13E7"
              />
              <path
                d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
                fill="#4A13E7"
              />
            </svg>
          </span> */}

        <div
          onClick={() => {
            router.push({
              pathname: "/offers/details",
              query: { offer: offerId },
            });
          }}
          className="text-[#4B4B4B] hover:text-primary flex items-center gap-x-3 border border-primary rounded-lg py-2 px-3 cursor-pointer w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="17"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path
              d="M8.1165 1.07827C8.30043 1.26226 8.40376 1.51176 8.40376 1.77191C8.40376 2.03207 8.30043 2.28157 8.1165 2.46555L3.26003 7.32203L8.1165 12.1785C8.29522 12.3635 8.39411 12.6114 8.39187 12.8686C8.38964 13.1259 8.28645 13.3719 8.10455 13.5538C7.92264 13.7357 7.67657 13.8389 7.41933 13.8412C7.16208 13.8434 6.91426 13.7445 6.72922 13.5658L1.1791 8.01567C0.995171 7.83169 0.891845 7.58218 0.891845 7.32203C0.891845 7.06187 0.995171 6.81237 1.1791 6.62839L6.72922 1.07827C6.9132 0.894341 7.16271 0.791016 7.42286 0.791016C7.68301 0.791016 7.93252 0.894342 8.1165 1.07827Z"
              fill="#4A13E7"
            />
          </svg>
          <span className=" text-xl font-medium mt-1">
            {translate("offers.table_headings.edit")}
          </span>
        </div>

        <div className="flex items-center justify-end gap-5">
          {/* <BaseButton
            buttonText={translate("offers.card_content.main_heading")}
            onClick={() => {
              router.push({
                pathname: "/offers/details",
                query: { offer: offerId },
              });
            }}
            containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
          >
            <OffersIcon pathClass="#4A13E7" />
          </BaseButton> */}
          <BaseButton
            buttonText={translate("offer_pdf_card.send_post")}
            onClick={handleSendByPost}
            containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "post"}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>
          <BaseButton
            buttonText={translate("offer_pdf_card.send_email")}
            onClick={onEmailSend}
            containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "email"}
            loaderColor="#4A13E7"
          >
            <EmailIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          <DownloadIcon onClick={onDownload} />
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
          {emailStatus && (
            <div className="border-[#FE9244] border rounded-md px-[8px] text-center w-fit">
              <span className="text-[#FE9244] text-base font-medium">
                {translate(`email_status.${emailStatus}`)}
              </span>
            </div>
          )}
        </div>
      </div>
    </EmailCardLayout>
  );
};

export default EmailCard;
