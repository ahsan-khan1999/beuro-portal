import React from "react";
import Image from "next/image";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import colorFullEmailIcon from "@/assets/svgs/color_ful_input_email.svg";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "../../../utils/static";
import { OfferDetailCardProps } from "@/types/offers";
import { PostIcon } from "@/assets/svgs/components/post-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { WriteIcon } from "@/assets/svgs/components/write-icon";
import {
  formatDateTimeToDate,
  getEmailColor,
  getOfferStatusColor,
  getPaymentTypeColor,
} from "@/utils/utility";
import { PrimaryPDF } from "@/assets/svgs/components/primary-pdf";
import { updateQuery } from "@/utils/update-query";
import { ImageUploadIcon } from "@/assets/svgs/components/image-upload-icon";
import { useTranslation } from "next-i18next";

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
  onFileUpload,
}: OfferDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemsValue = [
    `${translate("offer_status.Open")}`,
    `${translate("offer_status.Accepted")}`,
    `${translate("offer_status.Expired")}`,
    `${translate("offer_status.Rejected")}`,
  ];

  const items = Object.keys(staticEnums["OfferStatus"]).map((item, index) => ({
    item: { label: itemsValue[index], value: item },
  }));

  const paymentMethod = [
    `${translate("payment_method.Cash")}`,
    `${translate("payment_method.Online")}`,
    `${translate("payment_method.Twint")}`,
  ];

  const handleBack = () => {
    router.pathname = "/offers";
    delete router.query["offer"];
    delete router.query["offerID"];
    delete router.query["isMail"];
    updateQuery(router, router.locale as string);
  };

  const customerType = offerDetails?.leadID?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];
  const name =
    customerType === 1
      ? offerDetails?.leadID?.customerDetail?.companyName
      : offerDetails?.leadID?.customerDetail?.fullName;

  const heading =
    customerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");

  return (
    <div className="min-h-[217px]">
      <div className="flex flex-col xlg:flex-row justify-between xlg:items-center gap-y-3 pb-5 border-b border-[#e5e5e5]">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            className="cursor-pointer"
            onClick={handleBack}
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
          <p className="font-medium text-2xl ml-[27px]">
            {translate("offers.card_content.main_heading")}
          </p>
        </div>

        <div className="flex items-center justify-end gap-[22px]">
          <BaseButton
            buttonText={translate("offers.card_content.send_via_post")}
            onClick={handleSendByPost}
            containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
            textClassName="text-[#4B4B4B] font-semibold group-hover:text-primary"
            loading={loading}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          <button
            className={`w-fit border border-primary rounded-lg flex items-center px-4 py-2 cursor-pointer group ${
              isSendEmail && "hidden"
            }`}
            onClick={handleSendEmail}
          >
            <Image src={colorFullEmailIcon} alt="create_offer_icon" />
            <p className="font-semibold text-base text-[#4B4B4B] group-hover:text-primary ml-[10px] flex items-center">
              {offerDetails &&
                (offerDetails.emailStatus === "Sent" ? (
                  <>{translate("common.send_again")}</>
                ) : (
                  <>{translate("offers.card_content.send_button")}</>
                ))}
            </p>
          </button>

          {isSendEmail && (
            <PrimaryPDF
              onClick={() =>
                router.push({
                  pathname: `/offers/pdf-preview`,
                  query: {
                    ...router.query,
                    offerID: offerDetails?.id,
                    isMail: true,
                  },
                })
              }
            />
          )}
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

          <span
            onClick={offerDeleteHandler}
            className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center"
          >
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              className="cursor-pointer"
              width={16}
              height={20}
            />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div className="grid mlg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] items-center gap-y-1">
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("offers.card_content.offer_id")}:
            </span>
            <span className="text-base font-medium text-primary">
              {offerDetails?.offerNumber}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("offers.card_content.offer_title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex overflow-clip text-ellipsis">
              {offerDetails?.title}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("offers.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {offerDetails?.createdBy?.fullName}
            </span>
          </div>
        </div>

        <div className="grid mlg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] items-center gap-y-1">
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("offers.card_content.created_date")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {formatDateString(offerDetails?.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-normal text-[#4D4D4D] min-w-[110px]">
              {translate("offers.card_content.service_date")}:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                {offerDetails?.date?.map(
                  (item, index) =>
                    `${formatDateTimeToDate(item.startDate)}${
                      item.endDate
                        ? ` ${translate("contracts.card_content.to")} ` +
                          formatDateTimeToDate(item.endDate) +
                          ((offerDetails?.date?.length - 1 != index && ", ") ||
                            ".")
                        : (offerDetails?.date?.length - 1 != index && ", ") ||
                          "."
                    }`
                )}
                {offerDetails?.time &&
                  ` ${translate("common.at")} ` +
                    offerDetails?.time +
                    ` ${translate("common.clock")} `}
              </span>
            </div>
          </div>

          {offerDetails?.offerStatus === "Accepted" && (
            <BaseButton
              buttonText="Upload File"
              onClick={() => onFileUpload(offerDetails?.id)}
              containerClassName="w-fit bg-primary"
              textClassName="text-white"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-[minmax(350px,_350px)_minmax(150px,_100%)_minmax(150px,_250px)_minmax(50px,_100%)_minmax(50px,_100%)] gap-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("offers.card_content.email_status")}:
            </span>
            {offerDetails?.emailStatus && (
              <span
                className={`text-base font-medium border border-[${getEmailColor(
                  offerDetails?.emailStatus
                )}] rounded-lg px-4 py-[3px]`}
                style={{
                  color: `${getEmailColor(offerDetails?.emailStatus)}`,
                }}
              >
                {translate(`email_status.${offerDetails?.emailStatus}`)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("offers.card_content.payment_method")}:
            </span>
            <span>
              {offerDetails?.paymentType && (
                <DropDown
                  items={Object.keys(staticEnums["PaymentType"]).map(
                    (item, index) => ({
                      item: {
                        label: paymentMethod[index],
                        value: item,
                      },
                    })
                  )}
                  selectedItem={translate(
                    `payment_method.${offerDetails?.paymentType}`
                  )}
                  onItemSelected={handlePaymentStatusUpdate}
                  dropDownClassName={`border border-[${getPaymentTypeColor(
                    offerDetails?.paymentType
                  )}] w-fit rounded-lg px-4 py-[3px] flex items-center justify-center`}
                  dropDownTextClassName={`text-[${getPaymentTypeColor(
                    offerDetails?.paymentType
                  )}] text-base font-medium me-1`}
                  dropDownItemsContainerClassName="w-full"
                  dropDownIconClassName={`text-[${getPaymentTypeColor(
                    offerDetails?.paymentType
                  )}]`}
                />
              )}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("offers.card_content.status")}:
            </span>
            <span>
              {(staticEnums["OfferStatus"][offerDetails?.offerStatus] !== 1 && (
                <DropDown
                  items={items}
                  selectedItem={translate(
                    `offer_status.${offerDetails?.offerStatus}`
                  )}
                  onItemSelected={handleStatusUpdate}
                  dropDownClassName={`border ${
                    offerDetails?.offerStatus === "Open"
                      ? "border-[#4A13E7]"
                      : offerDetails?.offerStatus === "Accepted"
                      ? "border-[#45C769]"
                      : offerDetails?.offerStatus === "Expired"
                      ? "border-[#FF376F]"
                      : "border-[#FF0000]"
                  } min-w-[140px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
                  dropDownTextClassName={`text-[${getOfferStatusColor(
                    offerDetails?.offerStatus
                  )}] text-base font-medium me-1`}
                  dropDownItemsContainerClassName="min-w-[140px]"
                />
              )) || (
                <span
                  className="border w-fit rounded-lg px-4 py-[3px] flex items-center text-base font-medium"
                  style={{
                    borderColor: `${getOfferStatusColor(
                      offerDetails?.offerStatus
                    )}`,
                    color: `${getOfferStatusColor(offerDetails?.offerStatus)}`,
                  }}
                >
                  {translate(`offer_status.${offerDetails?.offerStatus}`)}
                </span>
              )}
            </span>
          </div>
          {offerDetails?.offerStatus === "Rejected" && (
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.reason")}:
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {offerDetails?.reason || "-"}
              </span>
            </div>
          )}
          <div className="flex justify-between gap-x-3 items-center mt-2 md:mt-0">
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.images")}:
              </span>

              <span
                className="cursor-pointer"
                onClick={(e) =>
                  handleImageUpload(
                    offerDetails?.id,
                    offerDetails?.offerNumber,
                    name,
                    heading,
                    e
                  )
                }
              >
                <ImageUploadIcon
                  pathClass={offerDetails?.isImageAdded ? "#FF0000" : "#4A13E7"}
                />
              </span>
            </div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.notes")}:
              </span>

              <span
                className="cursor-pointer"
                onClick={(e) =>
                  handleNotes(
                    offerDetails?.id,
                    offerDetails?.offerNumber,
                    name,
                    heading,
                    e
                  )
                }
              >
                <WriteIcon
                  pathClass={
                    offerDetails?.isNoteCreated ? "#FF0000" : "#4A13E7"
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsCard;
