import React from "react";
import Image from "next/image";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import colorFullEmailIcon from "@/assets/svgs/color_ful_input_email.svg";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "../../../utils/static";
import { useTranslation } from "next-i18next";
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
    <div className="min-h-[217px]">
      <div className="flex flex-col xlg:flex-row justify-between xlg:items-center gap-y-3 pb-5 border-b border-[#e5e5e5]">
        <div
          onClick={() => router.push("/offers")}
          className="flex items-center cursor-pointer"
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
          <p className="font-medium text-2xl ml-[27px]">
            {translate("offers.card_content.main_heading")}
          </p>
        </div>

        <div className="flex gap-[22px]">
          <BaseButton
            buttonText={translate("offers.card_content.send_via_post")}
            onClick={handleSendByPost}
            containerClassName="flex items-center group gap-x-3 row-reverse border  border-primary"
            textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
            loading={loading}
            loaderColor="#4A13E7"
          >
            <PostIcon className="text-primary group-hover:text-primary" />
          </BaseButton>

          <div
            className={`w-fit border-[1px] border-primary rounded-lg flex px-4 py-[6px] cursor-pointer ${
              isSendEmail && "hidden"
            }`}
            onClick={handleSendEmail}
          >
            <Image src={colorFullEmailIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px] flex items-center ">
              {translate("offers.card_content.send_button")}
            </p>
          </div>
          {isSendEmail && (
            <PrimaryPDF
              onClick={() =>
                router.push({
                  pathname: "/offers/pdf-preview",
                  query: { offerID: offerDetails?.id },
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

          <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center">
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              className="cursor-pointer"
              onClick={offerDeleteHandler}
              width={16}
              height={20}
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="grid mlg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] gap-y-1">
          <div>
            <span className="text-base font-normal text-[#4D4D4D] mr-[10px]">
              {translate("offers.card_content.offer_id")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {offerDetails?.offerNumber}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base  font-normal text-[#4D4D4D]">
              {translate("offers.card_content.offer_title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B] flex overflow-clip text-ellipsis">
              {offerDetails?.title}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("offers.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {offerDetails?.createdBy?.fullName}
            </span>
          </div>
        </div>

        <div className="grid gap-y-1 mlg:grid-cols-2 xl:grid-cols-[minmax(350px,_3fr)_minmax(450px,_100%)]">
          <div className="flex gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("offers.card_content.created_date")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {formatDateString(offerDetails?.createdAt)}
            </span>
          </div>
          <div className="flex gap-3">
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
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[minmax(350px,_350px)_minmax(300px,_100%)_minmax(250px,_250px)_minmax(150px,_100%)] gap-y-2">
          <div className="flex items-center gap-[11px]">
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
                {translate(offerDetails?.emailStatus)}
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
                    (item) => ({
                      item: item,
                    })
                  )}
                  selectedItem={offerDetails?.paymentType}
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
                  dropDownClassName={`border border-[${getOfferStatusColor(
                    offerDetails?.offerStatus
                  )}] w-fit rounded-lg px-4 py-[3px] flex items-center justify-center`}
                  dropDownTextClassName={`text-[${getOfferStatusColor(
                    offerDetails?.offerStatus
                  )}] text-base font-medium me-1`}
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
                  {offerDetails?.offerStatus}
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-[11px] cursor-pointer"
              onClick={(e) => handleNotes(offerDetails?.id, e)}
            >
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.notes")}:
              </span>
              <WriteIcon
                pathClass={offerDetails?.isNoteCreated ? "#FE9244" : "#4A13E7"}
              />
            </div>
            <div className="flex items-center gap-[11px]">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("offers.card_content.images")}:
              </span>

              <span
                className="cursor-pointer"
                onClick={(e) => handleImageUpload(offerDetails?.id, e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="none"
                >
                  <rect
                    x="1.36719"
                    y="0.69043"
                    width="31.1684"
                    height="31"
                    rx="7.5"
                    fill="white"
                    stroke="#4A13E7"
                  />
                  <path
                    d="M15.4044 22.0518H12.1297C11.1072 22.0518 10.2753 21.2199 10.2753 20.1974V11.7908C10.2753 10.7683 11.1072 9.93645 12.1297 9.93645H20.5362C21.5588 9.93645 22.3906 10.7683 22.3906 11.7908V15.1624C22.3906 15.5038 22.6674 15.7805 23.0088 15.7805C23.3501 15.7805 23.6269 15.5038 23.6269 15.1624V11.7908C23.6269 10.0867 22.2405 8.7002 20.5362 8.7002H12.1297C10.4255 8.7002 9.03906 10.0867 9.03906 11.7908V20.1974C9.03906 21.9016 10.4255 23.288 12.1297 23.288H15.4044C15.7458 23.288 16.0225 23.0113 16.0225 22.6699C16.0225 22.3285 15.7458 22.0518 15.4044 22.0518Z"
                    fill="#4A13E7"
                  />
                  <path
                    d="M24.3194 17.3499C23.5963 16.6269 22.4199 16.6269 21.6969 17.3499L18.5623 20.4845C17.6484 21.3984 17.145 22.6136 17.145 23.9061C17.145 24.2475 17.4218 24.5243 17.7631 24.5243C19.0557 24.5243 20.2709 24.0209 21.1849 23.1069L24.3194 19.9724C25.0424 19.2494 25.0424 18.0729 24.3194 17.3499ZM23.4452 18.224C23.6863 18.4651 23.6863 18.8572 23.4452 19.0982L23.0081 19.5353L22.134 18.6611L22.5711 18.224C22.8121 17.983 23.2043 17.983 23.4452 18.224ZM20.3107 22.2328C19.7939 22.7495 19.1478 23.09 18.4454 23.2239C18.5793 22.5215 18.9198 21.8754 19.4365 21.3586L21.2598 19.5353L22.134 20.4095L20.3107 22.2328Z"
                    fill="#4A13E7"
                  />
                  <path
                    d="M13.2906 14.7004L11.6923 16.2988C11.4509 16.5402 11.4509 16.9316 11.6923 17.173C11.9337 17.4144 12.3251 17.4144 12.5665 17.173L14.1648 15.5746C14.4058 15.3336 14.7979 15.3336 15.0389 15.5746L18.192 18.7277C18.4334 18.9691 18.8248 18.9691 19.0662 18.7277C19.3075 18.4863 19.3075 18.0949 19.0662 17.8535L15.9131 14.7004C15.1901 13.9775 14.0137 13.9775 13.2906 14.7004Z"
                    fill="#4A13E7"
                  />
                  <path
                    d="M19.3026 14.8806C18.2801 14.8806 17.4482 14.0488 17.4482 13.0263C17.4482 12.0038 18.2801 11.1719 19.3026 11.1719C20.3251 11.1719 21.157 12.0038 21.157 13.0263C21.157 14.0488 20.3251 14.8806 19.3026 14.8806ZM19.3026 12.4081C18.9618 12.4081 18.6845 12.6854 18.6845 13.0263C18.6845 13.3671 18.9618 13.6444 19.3026 13.6444C19.6435 13.6444 19.9208 13.3671 19.9208 13.0263C19.9208 12.6854 19.6435 12.4081 19.3026 12.4081Z"
                    fill="#4A13E7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsCard;
