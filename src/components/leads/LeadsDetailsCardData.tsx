import React from "react";
import createOfferIcon from "@/assets/svgs/create_offer_icon.png";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Lead } from "@/types/leads";
import { formatDateTimeToDate, getStatusColor } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/hooks/useRedux";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { updateQuery } from "@/utils/update-query";

const LeadsDetailsCardData = ({
  leadDeleteHandler,
  leadDetails,
  onStatusUpdate,
}: {
  leadDeleteHandler: Function;
  leadDetails: Lead;
  onStatusUpdate: (id: string) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const itemsValue = [
    `${translate("lead_status.Open")}`,
    `${translate("lead_status.InProcess")}`,
    `${translate("lead_status.Close")}`,
    `${translate("lead_status.Expired")}`,
  ];

  const items = Object.keys(staticEnums["LeadStatus"]).map((item, index) => ({
    item: { label: itemsValue[index], value: item },
  }));

  const handleBack = () => {
    router.pathname = "/leads";
    delete router.query["lead"];
    updateQuery(router, router.locale as string);
  };

  return (
    <div className="bg-white rounded-md w-full">
      <div className="flex gap-y-3 justify-between items-center border-b border-b-[#000] border-opacity-10 pb-5">
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
            {translate("leads.card_content.heading")}
          </p>
        </div>

        <div className="flex items-center justify-end gap-[22px]">
          <div
            className="w-fit border-[1px] border-[#4A13E7] rounded-lg flex px-4 py-[6px] cursor-pointer"
            onClick={() => {
              localStoreUtil.remove_data("offer");
              dispatch(
                setOfferDetails({
                  id: "convert",
                  type: "Existing Customer",
                  leadID: {
                    ...leadDetails,
                    customerID: leadDetails?.customerID,
                  },
                  serviceDetail: {
                    serviceDetail: leadDetails?.otherServices,
                  },
                  addressID: { address: leadDetails?.addressID?.address },
                  content: leadDetails?.requiredService,
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-5">
        <div className="flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("leads.card_content.lead_id")}:
          </span>
          <span className="font-medium text-[#4B4B4B] text-base">
            {leadDetails?.refID}
          </span>
        </div>
        <div className="max-w-[200px] flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("leads.card_content.status")}:
          </span>
          {/* {leadDetails.leadStatus && (
            <span className="font-medium text-base text-[#FE9244] px-[14px] py-1 text-center rounded-md border-[1px] border-[#FE9244]  min-w-[70px] w-fit">
              {translate(`lead_status.${leadDetails.leadStatus}`)}
            </span>
          )} */}

          <DropDown
            items={items}
            selectedItem={translate(`lead_status.${leadDetails?.leadStatus}`)}
            onItemSelected={onStatusUpdate}
            dropDownClassName={`border border-[${getStatusColor(
              leadDetails?.leadStatus
            )}] w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
            dropDownTextClassName={`text-[${getStatusColor(
              leadDetails?.leadStatus
            )}] text-base font-medium me-1`}
            dropDownItemsContainerClassName="w-full"
          />
        </div>

        <div className="flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("leads.card_content.created_date")}:
          </span>
          <span className="font-medium text-[#4B4B4B] text-base">
            {formatDateTimeToDate(leadDetails?.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("leads.card_content.created_by")}:
          </span>
          <span className="font-medium text-[#4B4B4B] text-base">
            {leadDetails?.createdBy?.fullName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeadsDetailsCardData;
