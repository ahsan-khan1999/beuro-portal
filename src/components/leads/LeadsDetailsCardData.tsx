import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import createOfferIcon from "@/assets/svgs/create_offer_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Lead } from "@/types/leads";
import { formatDate, formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/hooks/useRedux";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";

const LeadsDetailsCardData = ({
  leadDeleteHandler,
  leadDetails
}: {
  leadDeleteHandler: Function;
  leadDetails: Lead
}) => {
  
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch()
  return (
    <div className="bg-white rounded-md pt-5 pb-10">
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.push("/leads")}
          />
          <p className="font-medium text-[24px] leading-6 ml-[27px]">
            {translate("leads.card_content.heading")}
          </p>
        </div>

        <div className="flex gap-[22px]">
          <div className="w-fit border-[1px] border-[#C7C7C7] rounded-lg flex px-4 py-[6px] cursor-pointer" onClick={() => {
            dispatch(setOfferDetails({
              id:leadDetails?.id,
              type: "Existing Customer",
              customerID: leadDetails?.customerID,
              leadID: leadDetails?.id,
              customerType: getKeyByValue(staticEnums["CustomerType"], leadDetails?.customerDetail?.customerType),
              fullName: leadDetails?.customerDetail?.fullName,
              email: leadDetails?.customerDetail?.email,
              phoneNumber: leadDetails?.customerDetail?.phoneNumber,
              mobileNumber: leadDetails?.customerDetail?.mobileNumber,
            }))

            router.push("/offers/add")
          }}>
            <Image src={createOfferIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px]">
              {translate("leads.card_content.create_button")}
            </p>
          </div>
          <Image src={printerIcon} alt="printer_icon" />
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            className="cursor-pointer"
            onClick={() => leadDeleteHandler()}
          />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              {translate("leads.card_content.lead_id")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">{leadDetails.refID}</span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-[10px]">
              {translate("leads.card_content.status")}:
            </span>
            <span className="font-medium text-base text-[#FE9244] px-[14px] py-1 text-center rounded-md border-[1px] border-[#FE9244]  w-[70px]">
              {leadDetails.leadStatus}
            </span>
          </div>

          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              {translate("leads.card_content.created_date")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {formatDateTimeToDate(leadDetails.createdAt)}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-5">
              {translate("leads.card_content.created_by")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {leadDetails.createdBy?.fullName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDetailsCardData;
