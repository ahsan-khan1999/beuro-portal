import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";


const MailDetailsCard = () => {
  const router = useRouter();
  const { collectiveInvoiceDetails } = useAppSelector((state) => state.invoice);
  const { t: translate } = useTranslation();
  return (
    <>
      <div className="flex flex-col xlg:flex-row justify-between xlg:items-center border-b border-[#000] border-opacity-20 gap-y-3 pb-5">
        <div className="flex items-center gap-x-6">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="font-medium text-2xl">
            {translate("invoice.receipt_details")}
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* <BaseButton
            buttonText={translate("offers.card_content.send_via_post")}
            onClick={onSendViaPost}
            containerClassName="flex items-center group gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          <BaseButton
            buttonText={translate("contracts.pdf_card_details.send_via_email")}
            onClick={onEmailSend}
            containerClassName="flex items-center gap-x-3 row-reverse group"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading && activeButtonId === "email"}
            loaderColor="#4A13E7"
          >
            <EmailIcon className="text-primary group-hover:text-primary" />
          </BaseButton> */}
          {/* <Image
            src={PDFIcon}
            alt="PDFIcon"
            onClick={() =>
              router.push({
                pathname: "/invoices/receipt-pdf-preview",
                query: { invoiceID: collectiveInvoiceDetails?.id },
              })
            }
            className="cursor-pointer"
          /> */}
        </div>
      </div>

      <div className="grid grid-cols-1 xLarge:grid-cols-2 items-center gap-y-3 gap-x-10 mt-5">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D] mr-[10px]">
              {translate("invoice.card_content.receipt_number")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {collectiveInvoiceDetails?.invoiceID?.invoiceNumber}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D] break-all">
              {translate("content.details.receipt_title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
              {collectiveInvoiceDetails?.title}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-base  font-normal text-[#4D4D4D]">
              {translate("contracts.table_headings.status")}:
            </span>

            <span className="text-base font-medium text-[#FE9244] border border-[#FE9244] rounded-lg px-4">
              {collectiveInvoiceDetails?.invoiceID?.invoiceStatus}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {
                collectiveInvoiceDetails?.invoiceID?.contractID?.offerID
                  ?.createdBy?.fullName
              }
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailDetailsCard;
