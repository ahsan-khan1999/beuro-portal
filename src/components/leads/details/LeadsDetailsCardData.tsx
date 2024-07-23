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
import moment from "moment";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import appointmentIcon from "@/assets/pngs/appoinment-icon.png";
import { Button } from "@/base-components/ui/button/button";

export interface LeadDetailCardProps {
  leadDeleteHandler: Function;
  leadDetails: Lead;
  onStatusUpdate: (id: string) => void;
  onCreateAppointment: () => void;
}
const LeadsDetailsCardData = ({
  leadDeleteHandler,
  leadDetails,
  onStatusUpdate,
  onCreateAppointment,
}: LeadDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const itemsValue = [
    `${translate("leads.lead_dropdown_status.Open")}`,
    `${translate("leads.lead_dropdown_status.InProcess")}`,
    `${translate("leads.lead_dropdown_status.Close")}`,
    `${translate("leads.lead_dropdown_status.Expired")}`,
  ];

  const items = Object.keys(staticEnums["LeadStatus"]).map((item, index) => ({
    item: { label: itemsValue[index], value: item },
  }));

  const handleBack = () => {
    router.pathname = "/leads";
    delete router.query["lead"];
    updateQuery(router, router.locale as string);
  };

  const offerCreateHandler = () => {
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
        date: [
          {
            startDate: moment(leadDetails.desireDate).format("YYYY-MM-DD"),
            endDate: "",
          },
        ],
      })
    );
    dispatch(setCustomerDetails({ ...leadDetails?.customerDetail }));

    router.push("/offers/add");
  };

  return (
    <div>
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

        <div className="flex items-center gap-x-4">
          {leadDetails?.isAppointmentCreated ? (
            <Button
              inputType="button"
              onClick={() => {}}
              className="!h-10 py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
              text={translate("appointments.view_appointments_btn")}
              id="view-appointments"
              iconAlt="view-appointments"
            />
          ) : (
            <OutlineButton
              inputType="button"
              onClick={onCreateAppointment}
              className="bg-white text-[#4B4B4B] w-full border border-primary !h-10 hover:bg-transparent hover:text-primary"
              text={translate("appointments.create_appointments")}
              id="create-appointment"
              iconAlt="create-appointment"
              icon={appointmentIcon}
            />
          )}

          {leadDetails.leadStatus !== "Close" && (
            <OutlineButton
              inputType="button"
              onClick={offerCreateHandler}
              className="bg-white text-[#4B4B4B] w-full border border-primary !h-10 hover:bg-transparent hover:text-primary"
              text={translate("leads.card_content.create_button")}
              id="create offer"
              iconAlt="create offer"
              icon={createOfferIcon}
            />
          )}
          {/* {leadDetails.leadStatus !== "Close" && (
            <button
              className="group w-[180px] border-[1px] border-[#4A13E7] rounded-lg flex items-center px-4 py-[6px] cursor-pointer"
              onClick={offerCreateHandler}
            >
              <Image src={createOfferIcon} alt="create_offer_icon" />
              <p className="font-medium text-[16px] text-[#4B4B4B] ml-[10px] group-hover:text-primary">
                {translate("leads.card_content.create_button")}
              </p>
            </button>
          )} */}
          <div>
            <span
              onClick={() => leadDeleteHandler()}
              className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <Image src={deleteIcon} alt="deleteIcon" width={16} height={20} />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-5">
        <div className="flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("leads.card_content.lead_id")}:
          </span>
          <span className="font-medium text-primary text-base">
            {leadDetails?.refID}
          </span>
        </div>
        <div className="max-w-[250px] flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("leads.card_content.status")}:
          </span>
          {/* {leadDetails.leadStatus && (
            <span className="font-medium text-base text-[#FE9244] px-[14px] py-1 text-center rounded-md border-[1px] border-[#FE9244]  min-w-[70px] w-fit">
              {translate(`leads.lead_dropdown_status.${leadDetails.leadStatus}`)}
            </span>
          )} */}

          <DropDown
            items={items}
            selectedItem={translate(
              `leads.lead_dropdown_status.${leadDetails?.leadStatus}`
            )}
            onItemSelected={onStatusUpdate}
            dropDownClassName={`border border-[${getStatusColor(
              leadDetails?.leadStatus
            )}] w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
            dropDownTextClassName={`text-[${getStatusColor(
              leadDetails?.leadStatus
            )}] text-base font-medium me-1`}
            dropDownItemsContainerClassName="w-full"
            dropDownIconClassName={`text-[${getStatusColor(
              leadDetails?.leadStatus
            )}]`}
          />
        </div>
        <div className="flex items-center gap-x-3">
          <span className="font-normal text-[#4D4D4D] text-base">
            {translate("appointments.appointment")}:
          </span>
          <div
            className={`px-[10px] py-1 rounded-lg text-white text-sm font-medium text-center w-fit ${
              leadDetails?.isAppointmentCreated ? "bg-primary" : "bg-[#FB9600]"
            }`}
          >
            {leadDetails?.isAppointmentCreated
              ? translate("leads.created")
              : translate("leads.not_created")}
          </div>
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
