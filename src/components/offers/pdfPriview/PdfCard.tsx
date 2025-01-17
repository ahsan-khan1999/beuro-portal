import React, { useEffect } from "react";
import EmailCardLayout from "./PdfCardLayout";
import { useRouter } from "next/router";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { EmailHeaderProps } from "@/types";
import { EmailIcon } from "@/assets/svgs/components/email-icon";
import { PostIcon } from "@/assets/svgs/components/post-icon";
import { useTranslation } from "next-i18next";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";
import { getEmailColor } from "@/utils/utility";
import { PrintIcon } from "@/assets/svgs/components/print-icon";

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

  const handleBackToDetail = () => {
    const {
      status,
      page,
      text,
      sort,
      date,
      leadSource,
      emailStatus,
      noteType,
    } = router.query;

    const queryParams = Object.entries({
      status,
      page,
      text,
      sort,
      date,
      noteType,
      emailStatus,
      leadSource,
    }).reduce((acc, [key, value]) => {
      if (value) {
        (acc as { [key: string]: string | string[] })[key] = value;
      }
      return acc;
    }, {});

    router.push({
      pathname: "/offers/details",
      query: { ...queryParams, offer: offerId },
    });
  };

  return (
    <EmailCardLayout>
      <div className="flex justify-between gap-y-3 border-b border-[#000] border-opacity-10 pb-5">
        <button
          onClick={handleBackToDetail}
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
          <span className="text-xl font-medium">
            {translate("offers.table_headings.edit")}
          </span>
        </button>

        <h1 className="hidden mlg:flex items-center font-medium text-2xl">
          {translate("offers.offer_details.heading")}
        </h1>

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
            textClassName="text-[#4B4B4B] font-semibold group-hover:text-primary"
            loading={loading && activeButtonId === "post"}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>
          <BaseButton
            buttonText={
              emailStatus === "Sent"
                ? translate("common.send_again")
                : translate("offer_pdf_card.send_email")
            }
            onClick={onEmailSend}
            containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
            textClassName="text-[#4B4B4B] font-semibold group-hover:text-primary"
            loading={loading && activeButtonId === "email"}
            loaderColor="#4A13E7"
          >
            <EmailIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          <PrintIcon onClick={onPrint} />
          <DownloadIcon onClick={onDownload} />
        </div>
      </div>
      <div className="flex mt-5">
        <div className="flex items-center gap-3 mr-[56px]">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("offer_pdf_card.offer_id")}:
          </span>

          <span className="text-primary text-base font-medium">{offerNo}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#4D4D4D] text-base font-normal">
            {translate("offer_pdf_card.email_status")}:
          </span>

          {emailStatus && (
            <span
              className={`text-base font-medium border border-[${getEmailColor(
                emailStatus
              )}] rounded-lg px-4 py-[3px]`}
              style={{
                color: `${getEmailColor(emailStatus)}`,
              }}
            >
              {translate(`email_status.${emailStatus}`)}
            </span>
          )}
        </div>
      </div>
    </EmailCardLayout>
  );
};

export default EmailCard;
