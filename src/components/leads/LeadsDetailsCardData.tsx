import React from "react";
import createOfferIcon from "@/assets/svgs/create_offer_icon.png";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Lead } from "@/types/leads";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/hooks/useRedux";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";

const LeadsDetailsCardData = ({
  leadDeleteHandler,
  leadDetails,
}: {
  leadDeleteHandler: Function;
  leadDetails: Lead;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <div className="bg-white rounded-md w-full">
      <div className="flex justify-between items-center">
        <div
          onClick={() => router.push("/leads")}
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
            {translate("leads.card_content.heading")}
          </p>
        </div>

        <div className="flex items-center gap-[22px]">
          <div
            className="w-fit border-[1px] border-[#4A13E7] rounded-lg flex px-4 py-[6px] cursor-pointer"
            onClick={() => {
              localStoreUtil.remove_data("offer");
              dispatch(
                setOfferDetails({
                  id: leadDetails?.id,
                  type: "Existing Customer",
                  leadID: {
                    ...leadDetails,
                    customerID: leadDetails?.customerID,
                  },
                  serviceDetail: {
                    serviceDetail: leadDetails?.otherServices,
                  },
                  addressID: { address: leadDetails?.addressID?.address },
                  content: leadDetails?.requiredService

                })
              );
              dispatch(setCustomerDetails({ ...leadDetails?.customerDetail }));

              router.push("/offers/add");
            }}
          >
            <Image src={createOfferIcon} alt="create_offer_icon" />
            <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px]">
              {translate("leads.card_content.create_button")}
            </p>
          </div>
          <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center ">
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              className="cursor-pointer"
              onClick={() => leadDeleteHandler()}
              width={16}
              height={20}
            />
          </span>
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-normal text-[#4D4D4D] leading-6 text-base mr-5">
              {translate("leads.card_content.lead_id")}:
            </span>
            <span className="font-medium text-[#4B4B4B] text-base">
              {leadDetails.refID}
            </span>
          </div>
          <div>
            <span className="font-normal text-[#4D4D4D] text-base mr-[10px]">
              {translate("leads.card_content.status")}:
            </span>
            {leadDetails.leadStatus && (
              <span className="font-medium text-base text-[#FE9244] px-[14px] py-1 text-center rounded-md border-[1px] border-[#FE9244]  w-[70px]">
                {leadDetails.leadStatus}
              </span>
            )}
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
