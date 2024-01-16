import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import colorFullEmailIcon from "@/assets/svgs/color_ful_input_email.svg";
import writeIcon from "@/assets/svgs/write_icon.svg";
import imageIcon from "@/assets/svgs/edit_image.svg";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "../../../utils/static";
import postIcon from "@/assets/svgs/post_icon.svg";

import { useTranslation } from "next-i18next";
import { OfferDetailCardProps } from "@/types/offers";
import { Button } from "@/base-components/ui/button/button";
import { PostIcon } from "@/assets/svgs/components/post-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";

const OfferDetailsCard = ({
  offerDetails,
  offerDeleteHandler,
  handleImageUpload,
  handleNotes,
  handleStatusUpdate,
  handlePaymentStatusUpdate,
  handleSendEmail,
  isSendEmail,
  handleSendByPost,
  loading,
}: OfferDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const handleDonwload = () => {
    window.open(offerDetails?.attachement);
  };
  const handlePrint = () => {
    window.open(offerDetails?.attachement);
  };
  return (
    <>
      <div className="flex flex-col xlg:flex-row justify-between xlg:items-center gap-y-3 pb-5 border-b border-[#e5e5e5]">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.push("/offers")}
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {translate("offers.card_content.main_heading")}
          </p>
        </div>

        <div className="flex gap-[22px]">
          <BaseButton
            buttonText={translate("offers.card_content.send_via_post")}
            onClick={handleSendByPost}
            containerClassName="flex items-center group gap-x-3 row-reverse"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          <div
            className={`w-fit border-[1px] border-[#C7C7C7] rounded-lg flex px-4 py-[6px] cursor-pointer ${
              isSendEmail && "hidden"
            }`}
            onClick={handleSendEmail}
          >
            <Image src={colorFullEmailIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px] flex items-center ">
              {translate("offers.card_content.send_button")}
            </p>
          </div>
          <Image
            src={PDFIcon}
            alt="PDFIcon"
            onClick={() =>
              router.push({
                pathname: "/offers/pdf-preview",
                query: { offerID: offerDetails?.id },
              })
            }
            className="cursor-pointer"
          />
          {/* <Image
            src={downloadIcon}
            alt="downloadIcon"
            className="cursor-pointer"
            onClick={handleDonwload}
          />
          <Image
            src={printerIcon}
            alt="printerIcon"
            className="cursor-pointer"
            onClick={handlePrint}
          /> */}
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            className="cursor-pointer"
            onClick={offerDeleteHandler}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="grid mlg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] gap-y-1">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              {translate("offers.card_content.offer_id")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {offerDetails?.offerNumber}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              {translate("offers.card_content.offer_title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex overflow-clip text-ellipsis">
              {offerDetails?.title}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              {translate("offers.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {offerDetails?.createdBy?.fullName}
            </span>
          </div>
        </div>

        <div className="grid gap-y-1 mlg:grid-cols-2 xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_450px)_minmax(130px,_100%)]">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              {translate("offers.card_content.created_date")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {formatDateString(offerDetails?.createdAt)}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              {translate("offers.card_content.service_date")}:
            </span>
            <div className="flex gap-1">
              <span className="text-base font-medium text-[#4B4B4B]">
                {offerDetails?.date?.map(
                  (item) => `${item?.startDate} to ${item?.endDate}, `
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[minmax(350px,_350px)_minmax(300px,_100%)_minmax(250px,_250px)_minmax(150px,_100%)] gap-y-2">
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("offers.card_content.email_status")}:
            </span>
            <span className="text-base font-medium text-[#FE9244] border border-[#FE9244] rounded-lg px-4 py-[3px] ">
              {offerDetails?.emailStatus}
            </span>
          </div>
          <div className="flex items-center gap-[11px] ">
            <span className="text-[#4D4D4D] font-normal text-base  ">
              {translate("offers.card_content.payment_method")}:
            </span>
            <span>
              <DropDown
                items={Object.keys(staticEnums["PaymentType"]).map((item) => ({
                  item: item,
                }))}
                selectedItem={offerDetails?.paymentType}
                onItemSelected={handlePaymentStatusUpdate}
                dropDownClassName="border border-[#45C769] w-fit rounded-lg px-4 py-[3px] flex items-center"
                dropDownTextClassName="text-[#45C769] text-base font-medium me-1"
                dropDownItemsContainerClassName="w-full"
              />
            </span>
          </div>
          <div className="flex items-center gap-[11px] ">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("offers.card_content.status")}:
            </span>
            <span>
              {(staticEnums["OfferStatus"][offerDetails?.offerStatus] !== 1 && (
                <DropDown
                  items={Object.keys(staticEnums["OfferStatus"]).map(
                    (item) => ({
                      item: item,
                    })
                  )}
                  selectedItem={offerDetails?.offerStatus}
                  onItemSelected={handleStatusUpdate}
                  dropDownClassName="border border-[#FF0000] w-fit rounded-lg px-4 py-[3px] flex items-center"
                  dropDownTextClassName="text-[#FF0000] text-base font-medium me-1"
                />
              )) || (
                <span className="border border-[#FF0000] w-fit rounded-lg px-4 py-[3px] flex items-center text-[#FF0000] text-base font-medium ">
                  {offerDetails?.offerStatus}
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[11px] ">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.notes")}:
              </span>
              <Image
                src={writeIcon}
                alt="writeIcon"
                className="cursor-pointer"
                onClick={(e) => handleNotes(offerDetails?.id, e)}
              />
            </div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.images")}:
              </span>
              <Image
                src={imageIcon}
                alt="editImg"
                className="cursor-pointer"
                onClick={(e) => handleImageUpload(offerDetails?.id, e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetailsCard;
