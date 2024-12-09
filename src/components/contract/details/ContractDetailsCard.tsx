import React from "react";
import Image from "next/image";
import cofirmation_icon from "@/assets/svgs/confirmation_icon.svg";
import { useRouter } from "next/router";
import {
  germanDateFormat,
  getContractStatusColor,
  getEmailColor,
  getPaymentTypeColor,
} from "@/utils/utility";
import { ContractDetailCardProps } from "@/types/contract";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { WriteIcon } from "@/assets/svgs/components/write-icon";
import { PrimaryPDF } from "@/assets/svgs/components/primary-pdf";
import editIcon from "@/assets/svgs/edit_primary.svg";
import { updateQuery } from "@/utils/update-query";
import { ImageUploadIcon } from "@/assets/svgs/components/image-upload-icon";
import { useTranslation } from "next-i18next";

const ContractDetailsCard = ({
  contractDetails,
  handleImageUpload,
  handleNotes,
  handlePaymentStatusUpdate,
  handleStatusUpdate,
  handleSendEmail,
  isSendEmail,
  handleEditDateModal,
}: ContractDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const paymentMethod = [
    `${translate("payment_method.Cash")}`,
    `${translate("payment_method.Online")}`,
    `${translate("payment_method.Twint")}`,
  ];

  const contractStatus = [
    `${translate("contract_status.Open")}`,
    `${translate("contract_status.Confirmed")}`,
    `${translate("contract_status.Cancelled")}`,
  ];

  const handleBack = () => {
    router.pathname = "/contract";
    delete router.query["offer"];
    delete router.query["offerID"];
    delete router.query["isMail"];
    updateQuery(router, router.locale as string);
  };

  const customerType = contractDetails?.offerID?.leadID?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];

  const name =
    customerType === 1
      ? contractDetails?.offerID?.leadID?.customerDetail?.companyName
      : contractDetails?.offerID?.leadID?.customerDetail?.fullName;

  const heading =
    customerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");

  return (
    <div className="min-h-[218px]">
      <div className="flex justify-between items-center gap-y-3 pb-5 border-b border-[#000] border-opacity-10">
        <div className="flex items-center">
          <span className="cursor-pointer" onClick={handleBack}>
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
          </span>
          <p className="font-medium text-2xl ml-[27px]">
            {translate("contracts.card_content.heading")}
          </p>
        </div>
        <div className="flex justify-end gap-x-[22px]">
          <button
            onClick={handleSendEmail}
            className="w-fit border-[1px] border-primary rounded-lg flex items-center px-4 py-[6px]"
          >
            <Image src={cofirmation_icon} alt="create_offer_icon" />
            <span className="font-medium text-[16px] text-primary ml-[10px]">
              {translate("contracts.card_content.confirm_button")}
            </span>
          </button>

          {isSendEmail && (
            <PrimaryPDF
              onClick={() =>
                router.push({
                  pathname: "/contract/pdf-preview",
                  query: {
                    ...router.query,
                    offerID: contractDetails?.id,
                    isMail: true,
                  },
                })
              }
            />
          )}

          {/* <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center ">
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              className="cursor-pointer"
              onClick={offerDeleteHandler}
              width={16}
              height={20}
            />
          </span> */}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="grid mlg:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] gap-y-2 w-full">
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.contract_id")}:
            </span>
            <span className="text-base font-medium text-primary">
              {contractDetails.contractNumber}
            </span>
          </div>
          <div className="flex items-center gap-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-base font-normal text-[#4D4D4D] min-w-[120px]">
              {translate("contracts.table_headings.title")}:
            </span>

            <p className="text-base font-medium text-[#4B4B4B] truncate">
              {contractDetails.offerID?.title}
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {contractDetails.offerID?.createdBy?.fullName}
            </span>
          </div>
        </div>

        <div className="grid mlg:grid-cols-2 2xl:grid-cols-[minmax(350px,_3fr)_minmax(450px,_100%)] gap-y-2">
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.offer_id")}:
            </span>
            <span className="text-base font-medium text-[#4A13E7]">
              {contractDetails.offerID?.offerNumber}
            </span>
          </div>
          {/* <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.created_date")}:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                {formatDateToCustomString(contractDetails.createdAt)}
              </span>
            </div>
          </div> */}
          <div className="flex items-center gap-x-3">
            <span className="text-base font-normal text-[#4D4D4D] min-w-[110px]">
              {translate("contracts.card_content.service_date")}:
            </span>
            <div className="flex items-center gap-x-3">
              <span className="text-base font-medium text-[#4B4B4B]">
                {contractDetails?.offerID?.date?.map(
                  (item, index) =>
                    `${germanDateFormat(item.startDate)}${
                      item.endDate
                        ? ` ${translate("contracts.card_content.to")} ` +
                          germanDateFormat(item.endDate) +
                          ((contractDetails?.offerID?.date?.length - 1 !=
                            index &&
                            ", ") ||
                            ".")
                        : (contractDetails?.offerID?.date?.length - 1 !=
                            index &&
                            ", ") ||
                          "."
                    }`
                )}
                {contractDetails?.offerID?.time &&
                  ` ${translate("common.at")} ` +
                    contractDetails?.offerID?.time +
                    ` ${translate("common.clock")} `}
              </span>
              <Image
                src={editIcon}
                alt="edit date"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={handleEditDateModal}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(300px,_300px)_minmax(350px,_350px)_minmax(200px,_100%)] gap-y-2">
          <div className="flex items-center gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.email_status")}:
            </span>
            {contractDetails?.emailStatus && (
              <div
                className={`text-base font-medium border border-[${getEmailColor(
                  contractDetails?.emailStatus
                )}] rounded-lg px-4 py-[3px] cursor-default`}
                style={{
                  color: `${getEmailColor(contractDetails?.emailStatus)}`,
                }}
              >
                {translate(`email_status.${contractDetails?.emailStatus}`)}
              </div>
            )}
          </div>

          {/* <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("contracts.card_content.offer_status")}:
            </span>
            <span className="text-base font-medium text-[#4A13E7] border border-[#4A13E7] rounded-lg px-4 py-[3px] cursor-default">
              {contractDetails.offerID?.offerStatus}
            </span>
          </div> */}

          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("contracts.card_content.payment_method")}:
            </span>
            {contractDetails?.paymentType && (
              <span>
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
                    `payment_method.${contractDetails?.paymentType}`
                  )}
                  onItemSelected={handlePaymentStatusUpdate}
                  dropDownClassName={`border border-[${getPaymentTypeColor(
                    contractDetails?.paymentType
                  )}] w-fit rounded-lg px-4 py-[3px] flex items-center`}
                  dropDownTextClassName={`text-[${getPaymentTypeColor(
                    contractDetails?.paymentType
                  )}] text-base font-medium me-1`}
                  dropDownItemsContainerClassName="w-full"
                  dropDownIconClassName={`text-[${getPaymentTypeColor(
                    contractDetails?.paymentType
                  )}]`}
                />
              </span>
            )}
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="text-[#4D4D4D] font-normal text-base">
              {translate("contracts.card_content.contract_status")}:
            </span>
            <span>
              {(staticEnums["ContractStatus"][
                contractDetails?.contractStatus
              ] !== 3 && (
                <DropDown
                  items={Object.keys(staticEnums["ContractStatus"]).map(
                    (item, index) => ({
                      item: {
                        label: contractStatus[index],
                        value: item,
                      },
                    })
                  )}
                  selectedItem={translate(
                    `contract_status.${contractDetails?.contractStatus}`
                  )}
                  onItemSelected={handleStatusUpdate}
                  dropDownClassName={`border border-[${getContractStatusColor(
                    contractDetails?.contractStatus
                  )}] min-w-[140px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
                  dropDownTextClassName={`text-[${getContractStatusColor(
                    contractDetails?.contractStatus
                  )}] text-base font-medium me-1`}
                  dropDownIconClassName={`text-[${getContractStatusColor(
                    contractDetails?.contractStatus
                  )}]`}
                  dropDownItemsContainerClassName="min-w-[140px]"
                />
              )) || <></>}
            </span>
          </div>

          <div className="flex gap-x-10">
            <div className="flex items-center gap-x-3">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("contracts.card_content.images")}:
              </span>

              <span
                className="cursor-pointer"
                onClick={(e) =>
                  handleImageUpload(
                    contractDetails?.id,
                    contractDetails?.contractNumber,
                    name,
                    heading,
                    e
                  )
                }
              >
                <ImageUploadIcon
                  pathClass={
                    contractDetails?.isImageAdded ? "#FF0000" : "#4A13E7"
                  }
                />
              </span>
            </div>
            <div
              className="flex items-center gap-[11px] cursor-pointer"
              onClick={(e) =>
                handleNotes(
                  contractDetails?.id,
                  contractDetails?.contractNumber,
                  name,
                  heading,
                  e
                )
              }
            >
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("contracts.card_content.notes")}:
              </span>

              <WriteIcon
                pathClass={
                  contractDetails?.isNoteCreated ? "#FF0000" : "#4A13E7"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsCard;
