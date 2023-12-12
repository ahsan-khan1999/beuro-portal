import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import colorFullEmailIcon from "@/assets/svgs/color_ful_input_email.svg";
import editIcon from "@/assets/svgs/name-input.svg";
import writeIcon from "@/assets/svgs/write_icon.svg";
import imageIcon from "@/assets/svgs/edit_image.svg";
import { useRouter } from "next/router";
import { OffersTableRowTypes } from "@/types/offers";
import { formatDateString } from "@/utils/functions";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from '../../../utils/static';

interface OfferDetailCardProps {
  offerDetails: OffersTableRowTypes
  offerDeleteHandler: () => void
  handleNotes: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void
  handleImageUpload: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void
  handleStatusUpdate: (id: string) => void
  handlePaymentStatusUpdate: (id: string) => void;
  handleSendEmail: () => void

}
import { useTranslation } from "next-i18next";

const OfferDetailsCard = ({ offerDetails, offerDeleteHandler, handleImageUpload, handleNotes, handleStatusUpdate, handlePaymentStatusUpdate, handleSendEmail }: OfferDetailCardProps) => {
  console.log(offerDetails?.paymentType);

  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 ">
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
          <div className="w-fit border-[1px] border-[#C7C7C7] rounded-lg flex px-4 py-[6px] cursor-pointer " onClick={handleSendEmail}>
            <Image src={colorFullEmailIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px]">
              {translate("offers.card_content.send_button")}
            </p>
          </div>
          <Image
            src={PDFIcon}
            alt="PDFIcon"
            onClick={() => router.push("/offers/pdf-preview")}
            className="cursor-pointer"
          />
          <Image src={downloadIcon} alt="downloadIcon" />
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" onClick={offerDeleteHandler} />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] gap-y-1">
          <div>
            <span className="text-base  font-normal text-[4D4D4D] mr-[10px]">
              {translate("offers.card_content.offer_id")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">{offerDetails?.offerNumber}</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[4D4D4D]">
              {translate("offers.card_content.offer_title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex">
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

        <div className="grid gap-y-1 lg:grid-cols-2 xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_450px)_minmax(130px,_100%)]">
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
                {offerDetails?.date?.map((item) => (`${item?.startDate} to ${item?.endDate}`))}
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
              Payment Method:
            </span>
            <span>

              <DropDown
                items={Object.keys(staticEnums['PaymentType']).map((item) => ({ item: item }))}
                selectedItem={offerDetails?.paymentType}
                onItemSelected={handlePaymentStatusUpdate}
                dropDownClassName="border border-[#45C769] w-fit rounded-lg px-4 py-[3px] flex items-center"
                dropDownTextClassName="text-[#45C769] text-base font-medium me-1"

              />
            </span>
          </div>
          <div className="flex items-center gap-[11px] ">
            <span className="text-[#4D4D4D] font-normal text-base">
              Status:
            </span>
            {
              staticEnums['OfferStatus'][offerDetails?.offerStatus] !== 1 &&
              <DropDown
                items={Object.keys(staticEnums['OfferStatus']).map((item) => ({ item: item }))}
                selectedItem={offerDetails?.offerStatus}
                onItemSelected={handleStatusUpdate}
                dropDownClassName="border border-[#FF0000] w-fit rounded-lg px-4 py-[3px] flex items-center"
                dropDownTextClassName="text-[#FF0000] text-base font-medium me-1"

              /> || <span
                className="border border-[#FF0000] w-fit rounded-lg px-4 py-[3px] flex items-center text-[#FF0000] text-base font-medium "
              >{offerDetails?.offerStatus}</span>
            }
          </div>

          <div>
            <div className="flex items-center gap-[11px] ">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.notes")}:
              </span>
              <Image src={writeIcon} alt="writeIcon" className="cursor-pointer" onClick={(e) => handleNotes(offerDetails?.id, e)} />
            </div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.images")}:
              </span>
              <Image src={imageIcon} alt="editImg" className="cursor-pointer" onClick={(e) => handleImageUpload(offerDetails?.id, e)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetailsCard;
