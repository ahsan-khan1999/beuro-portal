import React from "react";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import PDFIcon from "@/assets/svgs/PDF_ICON.svg";
import cofirmation_icon from "@/assets/svgs/confirmation_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import writeIcon from "@/assets/svgs/write_icon.svg";
import imageIcon from "@/assets/svgs/edit_image.svg";
import { useRouter } from "next/router";
import {
  formatDateTimeToDate,
  getContractStatusColor,
  getEmailColor,
  getPaymentTypeColor,
} from "@/utils/utility";
import { ContractDetailCardProps } from "@/types/contract";
import { formatDateToCustomString } from "@/utils/functions";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { WriteIcon } from "@/assets/svgs/components/write-icon";

const ContractDetailsCard = ({
  contractDetails,
  handleImageUpload,
  handleNotes,
  handlePaymentStatusUpdate,
  handleStatusUpdate,
  offerDeleteHandler,
  handleSendEmail,
}: ContractDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const handleDonwload = () => {
    window.open(contractDetails?.attachement);
  };
  const handlePrint = () => {
    window.open(contractDetails?.attachement);
  };
  return (
    <>
      <div className="flex flex-col mlg:flex-row justify-between xl:items-center gap-y-3 pb-5 border-b border-[#000] border-opacity-20">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.push("/contract")}
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {translate("contracts.card_content.heading")}
          </p>
        </div>

        <div className="flex gap-x-[22px]">
          <button
            onClick={handleSendEmail}
            className="w-fit border-[1px] border-primary rounded-lg flex items-center px-4 py-[6px]"
          >
            <Image src={cofirmation_icon} alt="create_offer_icon" />
            <span className="font-medium text-[16px] text-primary ml-[10px]">
              {translate("contracts.card_content.confirm_button")}
            </span>
          </button>
          <Image
            src={PDFIcon}
            alt="PDFIcon"
            className="cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/contract/pdf-preview",
                query: { offerID: contractDetails?.id },
              })
            }
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
        <div className="grid mlg:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_100%)_minmax(230px,_230px)] gap-y-2">
          <div>
            <span className="text-base font-normal text-[#4D4D4D] mr-[10px]">
              {translate("contracts.card_content.contract_id")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {contractDetails.contractNumber}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.offer_title")}:
            </span>

            <span className="text-base font-medium text-[#4B4B4B]">
              {contractDetails.offerID?.title}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.worker")}:
            </span>
            <span className="text-base font-medium text-[#4B4B4B]">
              {contractDetails.offerID?.createdBy?.fullName}
            </span>
          </div>
        </div>

        <div className="grid mlg:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(450px,_450px)_minmax(130px,_100%)] gap-y-2">
          <div>
            <span className="text-base font-normal text-[#4D4D4D] mr-[10px]">
              {translate("contracts.card_content.offer_id")}:
            </span>
            <span className="text-base font-medium text-[#4A13E7]">
              {contractDetails.offerID?.offerNumber}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.created_date")}:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                {formatDateToCustomString(contractDetails.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.service_date")}:
            </span>
            <div>
              <span className="text-base font-medium text-[#4B4B4B]">
                {contractDetails?.offerID?.date?.map(
                  (item) =>
                    `${formatDateTimeToDate(
                      item.startDate
                    )} to ${formatDateTimeToDate(item.endDate)}`
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 2xl:grid-cols-[minmax(350px,_350px)_minmax(300px,_300px)_minmax(350px,_350px)_minmax(200px,_100%)] gap-y-2">
          <div className="flex items-center gap-[10px]">
            <span className="text-base font-normal text-[#4D4D4D]">
              {translate("contracts.card_content.email_status")}:
            </span>
            <div
              className={`text-base font-medium border border-[${getEmailColor(
                contractDetails?.emailStatus
              )}] rounded-lg px-4 py-[3px] cursor-default`}
              style={{
                color: `${getEmailColor(contractDetails?.emailStatus)}`,
              }}
            >
              {translate(contractDetails?.emailStatus)}
            </div>
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
            <span className="text-[#4D4D4D] font-normal text-base ">
              {translate("contracts.card_content.payment_method")}:
            </span>
            <span>
              <DropDown
                items={Object.keys(staticEnums["PaymentType"]).map((item) => ({
                  item: item,
                }))}
                selectedItem={contractDetails?.paymentType}
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
                    (item) => ({ item: item })
                  )}
                  selectedItem={contractDetails?.contractStatus}
                  onItemSelected={handleStatusUpdate}
                  dropDownClassName={`border border-[${getContractStatusColor(
                    contractDetails?.contractStatus
                  )}] rounded-lg px-4 py-[3px] flex items-center`}
                  dropDownTextClassName={`text-[${getContractStatusColor(
                    contractDetails?.contractStatus
                  )}] text-base font-medium me-1`}
                  dropDownIconClassName={`text-[${getContractStatusColor(
                    contractDetails?.contractStatus
                  )}]`}
                />
              )) || (
                <span
                  className="border w-auto rounded-lg px-4 py-[3px] flex items-center text-base font-medium"
                  style={{
                    borderColor: `${getContractStatusColor(
                      contractDetails?.contractStatus
                    )}`,
                    color: `${getContractStatusColor(
                      contractDetails?.contractStatus
                    )}`,
                  }}
                >
                  {contractDetails?.contractStatus}
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between">
            
            <div className="flex items-center gap-[11px] cursor-pointer"
            onClick={(e) => handleNotes(contractDetails?.id, e)}
            >
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("contracts.card_content.notes")}:
              </span>
              {/* <Image
                src={writeIcon}
                alt="writeIcon"
                className="cursor-pointer"
                onClick={(e) => handleNotes(contractDetails?.id, e)}
              /> */}
              <WriteIcon pathClass={contractDetails?.isNoteCreated ? "#FE9244" : "#4A13E7"} />

            </div>
            <div className="flex items-center gap-[11px] ">
              <span className="text-[#4D4D4D] font-normal text-base">
                {translate("contracts.card_content.images")}:
              </span>
              <Image
                src={imageIcon}
                alt="editImg"
                className="cursor-pointer"
                onClick={(e) => handleImageUpload(contractDetails?.id, e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailsCard;
