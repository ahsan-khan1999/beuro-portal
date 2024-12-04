import React from "react";
import createOfferIcon from "@/assets/svgs/create_offer_icon.png";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Lead } from "@/types/leads";
import { formatDateTimeToDate, getStatusColor } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { updateQuery } from "@/utils/update-query";
import moment from "moment";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import appointmentIcon from "@/assets/pngs/appoinment-icon.png";
import { BackIcon } from "@/assets/svgs/components/back-icon";
import { ImageUploadIcon } from "@/assets/svgs/components/image-upload-icon";
import { WriteIcon } from "@/assets/svgs/components/write-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { PostIcon } from "@/assets/svgs/components/post-icon";
import colorFullEmailIcon from "@/assets/svgs/color_ful_input_email.svg";

export interface LeadDetailCardProps {
  leadDeleteHandler: Function;
  leadDetails: Lead;
  onStatusUpdate: (id: string) => void;
  onCreateAppointment: () => void;
  isAgent?: boolean;
  handleNotes: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleImageUpload: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  loading?: boolean;
  isSendEmail?: boolean;
  handleSendEmail?: () => void;
  handleSendByPost?: () => void;
}
const LeadsDetailsCardData = ({
  leadDeleteHandler,
  leadDetails,
  onStatusUpdate,
  onCreateAppointment,
  isAgent,
  handleImageUpload,
  handleNotes,
  loading,
  handleSendByPost,
  handleSendEmail,
  isSendEmail,
}: LeadDetailCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

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
    router.pathname = isAgent ? "/agent/leads" : "/leads";
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

  const customerType = leadDetails?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];
  const name =
    customerType === 1
      ? leadDetails?.customerDetail?.companyName
      : leadDetails?.customerDetail?.fullName;

  const heading =
    customerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");

  return (
    <div>
      <div className="flex flex-col xlg:flex-row justify-between xlg:items-center gap-y-3 pb-5 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-x-3 xMini:gap-x-[27px]">
          <BackIcon onClick={handleBack} />
          <p className="font-medium text-base xMini:text-2xl">
            {translate("leads.card_content.heading")}
          </p>
        </div>

        {!isAgent && (
          <div className="items-center justify-end gap-x-4 hidden xMini:flex">
            {leadDetails?.isAppointmentCreated ? (
              // <Button
              //   inputType="button"
              //   onClick={handleReportPDF}
              //   className="!h-10 py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
              //   text={translate("appointments.view_appointments_btn")}
              //   id="view-appointments"
              //   iconAlt="view-appointments"
              // />
              <></>
            ) : (
              <>
                {user?.company?.isAppointment && (
                  <OutlineButton
                    inputType="button"
                    onClick={onCreateAppointment}
                    className="bg-white text-[#4B4B4B] w-fit border border-primary !h-10 hover:bg-transparent hover:text-primary"
                    text={translate("appointments.create_appointments")}
                    id="create-appointment"
                    iconAlt="create-appointment"
                    icon={appointmentIcon}
                  />
                )}
              </>
            )}

            {leadDetails.leadStatus !== "Close" && (
              <OutlineButton
                inputType="button"
                onClick={offerCreateHandler}
                className="bg-white text-[#4B4B4B] w-fit border border-primary !h-10 hover:bg-transparent hover:text-primary"
                text={translate("leads.card_content.create_button")}
                id="create offer"
                iconAlt="create offer"
                icon={createOfferIcon}
              />
            )}

            <div className="flex items-center gap-x-4">
              {handleSendByPost && (
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
              )}

              <button
                className={`w-fit border border-primary rounded-lg flex items-center px-4 py-2 cursor-pointer group ${
                  isSendEmail && "hidden"
                }`}
                onClick={handleSendEmail}
              >
                <Image src={colorFullEmailIcon} alt="create_offer_icon" />
                <p className="font-semibold text-base text-[#4B4B4B] group-hover:text-primary ml-[10px] flex items-center">
                  {leadDetails &&
                    (leadDetails.emailStatus === "Sent" ? (
                      <>{translate("common.send_again")}</>
                    ) : (
                      <>{translate("offers.card_content.send_button")}</>
                    ))}
                </p>
              </button>
            </div>

            <div
              onClick={() => leadDeleteHandler()}
              className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center"
            >
              <Image
                src={deleteIcon}
                alt="deleteIcon"
                className="cursor-pointer"
                width={16}
                height={20}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xMini:grid-cols-3 items-center gap-x-5 xlg:gap-x-20 gap-y-3 pt-2 mlg:pt-5">
        <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-y-2 mlg:gap-y-0 gap-x-[10px]">
          <span className="font-normal text-[#848484] text-sm mlg:text-base">
            {translate("leads.card_content.lead_id")}:
          </span>
          <span className="font-medium text-primary text-base">
            {leadDetails?.refID}
          </span>
        </div>

        <div className="w-full flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px] gap-y-2 mlg:gap-y-0">
          <p className="font-normal text-[#848484] text-sm mlg:text-base">
            {translate("leads.card_content.status")}:
          </p>

          {!isAgent ? (
            <DropDown
              items={items}
              selectedItem={translate(
                `leads.lead_dropdown_status.${leadDetails?.leadStatus}`
              )}
              onItemSelected={onStatusUpdate}
              dropDownClassName={`border ${
                leadDetails?.leadStatus === "Open"
                  ? "border-[#4A13E7]"
                  : leadDetails?.leadStatus === "InProcess"
                  ? "border-[#f5d60f]"
                  : leadDetails?.leadStatus === "Close"
                  ? "border-[#45C769]"
                  : "border-[#FF0000]"
              } w-fit min-w-[170px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
              dropDownTextClassName={`${
                leadDetails?.leadStatus === "Open"
                  ? "text-[#4A13E7]"
                  : leadDetails?.leadStatus === "InProcess"
                  ? "text-[#000]"
                  : leadDetails?.leadStatus === "Close"
                  ? "text-[#45C769]"
                  : "text-[#FF0000]"
              } text-base font-medium me-1`}
              dropDownItemsContainerClassName="min-w-[170px]"
              isMobileLead={true}
              dropDownIconClassName={`text-[${getStatusColor(
                leadDetails?.leadStatus
              )}]`}
            />
          ) : (
            <div
              className={`px-[10px] py-1 min-w-[120px] w-fit rounded-lg ${
                leadDetails?.leadStatus === "InProcess"
                  ? "text-dark"
                  : "text-white"
              } text-sm font-medium text-center ${
                leadDetails?.leadStatus === "Open"
                  ? "bg-[#4A13E7]"
                  : leadDetails?.leadStatus === "InProcess"
                  ? "bg-[#f5d60f]"
                  : leadDetails?.leadStatus === "Close"
                  ? "bg-[#45C769]"
                  : "bg-[#FF0000]"
              }`}
            >
              {translate(
                `leads.lead_dropdown_status.${leadDetails?.leadStatus}`
              )}
            </div>
          )}
        </div>
        {user?.company?.isAppointment && (
          <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px] gap-y-2 mlg:gap-y-0">
            <span className="font-normal text-[#848484] text-sm mlg:text-base">
              {translate("appointments.appointment")}:
            </span>
            <div
              className={`px-[10px] py-1 rounded-lg text-white text-sm font-medium text-center xs:w-[120px] mlg:w-fit ${
                leadDetails?.isAppointmentCreated
                  ? "bg-primary"
                  : "bg-[#FB9600]"
              }`}
            >
              {leadDetails?.isAppointmentCreated
                ? translate("leads.created")
                : translate("leads.not_created")}
            </div>
          </div>
        )}
        <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px] gap-y-2 mlg:gap-y-0">
          <span className="font-normal text-[#848484] text-sm mlg:text-base min-w-[120px]">
            {translate("leads.card_content.created_date")}:
          </span>
          <span className="font-medium text-[#4B4B4B] text-base">
            {formatDateTimeToDate(leadDetails?.createdAt)}
          </span>
        </div>
        <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px] gap-y-2 mlg:gap-y-0">
          <span className="font-normal text-[#4D4D4D] text-base min-w-[100px]">
            {translate("leads.card_content.created_by")}:
          </span>
          <span className="font-medium text-[#848484] text-sm mlg:text-base truncate">
            {leadDetails?.createdBy?.fullName}
          </span>
        </div>
        {/* {isAgent && ( */}
        <div className="hidden xMini:flex gap-x-8 items-center mt-2 md:mt-0">
          <div className="flex items-center gap-[11px]">
            <span className="font-normal text-[#848484] text-sm mlg:text-base">
              {translate("offers.card_content.images")}:
            </span>

            <span
              className="cursor-pointer"
              onClick={(e) =>
                handleImageUpload(
                  leadDetails?.id,
                  leadDetails?.refID,
                  name,
                  heading,
                  e
                )
              }
            >
              <ImageUploadIcon
                pathClass={leadDetails?.isImageAdded ? "#FF0000" : "#4A13E7"}
              />
            </span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="font-normal text-[#848484] text-sm mlg:text-base">
              {translate("offers.card_content.notes")}:
            </span>

            <span
              className="cursor-pointer"
              onClick={(e) =>
                handleNotes(
                  leadDetails?.id,
                  leadDetails?.refID,
                  name,
                  heading,
                  e
                )
              }
            >
              <WriteIcon
                pathClass={leadDetails?.isNoteCreated ? "#FF0000" : "#4A13E7"}
              />
            </span>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default LeadsDetailsCardData;
