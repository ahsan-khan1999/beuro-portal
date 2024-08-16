import { BackIcon } from "@/assets/svgs/components/back-icon";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { Appointments } from "@/types/appointments";
import { formatDateTimeToDate } from "@/utils/utility";
import localStoreUtil from "@/utils/localstore.util";
import { useAppDispatch } from "@/hooks/useRedux";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import moment from "moment";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import createOfferIcon from "@/assets/svgs/create_offer_icon.png";

export interface AppointmentsDetailCardProps {
  onStatusChange: (id: string) => void;
  appointmentDetails: Appointments;
  isAgent?: boolean;
}

export const AppointmentsDetailCard = ({
  onStatusChange,
  appointmentDetails,
  isAgent,
}: AppointmentsDetailCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  const { companyAppointment } = router.query;

  const handleBack = () => {
    router.pathname = companyAppointment
      ? "/appointments"
      : "/agent/appointments";
    delete router.query["appointment"];
    delete router.query["report"];
    delete router.query["companyAppointment"];
    updateQuery(router, router.locale as string);
  };

  const itemsValue = [
    `${translate("appointments.appointment_status.Pending")}`,
    `${translate("appointments.appointment_status.Completed")}`,
    `${translate("appointments.appointment_status.Cancelled")}`,
  ];

  const items = Object.keys(staticEnums["AppointmentStatus"]).map(
    (item, index) => ({
      item: { label: itemsValue[index], value: item },
    })
  );

  const offerCreateHandler = () => {
    localStoreUtil.remove_data("appointment");
    dispatch(
      setOfferDetails({
        id: "convert",
        type: "Existing Customer",
        leadID: {
          ...appointmentDetails,
          customerID: appointmentDetails?.leadID?.customerID,
        },
        serviceDetail: {
          serviceDetail: appointmentDetails?.leadID?.otherServices,
        },
        addressID: { address: appointmentDetails?.leadID?.addressID?.address },
        content: appointmentDetails?.leadID?.requiredService,
        date: [
          {
            startDate: moment(appointmentDetails?.leadID?.desireDate).format(
              "YYYY-MM-DD"
            ),
            endDate: "",
          },
        ],
      })
    );
    dispatch(
      setCustomerDetails({ ...appointmentDetails?.leadID?.customerDetail })
    );
    router.push("/offers/add");
  };

  return (
    <div className="bg-white pt-5 pl-5 pr-6 pb-[37px] rounded-lg">
      <div className="flex items-center justify-between border-b border-b-[#000] border-opacity-10 pb-5">
        <div className="flex items-center gap-x-4">
          <BackIcon onClick={handleBack} />
          <h1 className="text-[#222B45] text-2xl font-semibold">
            {translate("appointments.detail_heading")}
          </h1>
        </div>
        <div className="flex items-center gap-x-4">
          {!appointmentDetails?.leadID?.isOfferCreated && !isAgent && (
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
          {/* <Button
            inputType="button"
            onClick={onScheduleAppointments}
            className="!h-10 py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
            text={translate("appointments.reschedule_btn")}
            id="reschedule"
            iconAlt="reschedule"
          />
          <OutlineButton
            inputType="button"
            onClick={() => {}}
            className="bg-white text-[#D80027] w-full border border-[#D80027] px-4 !h-10"
            text={translate("common.cancel_button")}
            id="cancel"
            iconAlt="cancel"
          /> */}
        </div>
      </div>

      <div className="flex flex-col gap-y-5 mlg:gap-y-0 mlg:flex-row justify-between mlg:items-center">
        <div
          className={`flex flex-col gap-y-5 mlg:gap-y-[34px] mt-[10px] mlg:mt-[34px]`}
        >
          <div className="grid grid-cols-2 xMini:grid-cols-3 items-center mlg:gap-x-20 gap-y-5">
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[65px] w-fit">
                {translate("appointments.detail_data.lead_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.leadID?.refID}
              </span>
            </div>
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[130px] w-fit">
                {translate("appointments.detail_data.appointment_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.leadID?.refID}
              </span>
            </div>
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[60px] w-fit">
                {translate("appointments.detail_data.status")}:
              </span>
              <DropDown
                items={items}
                selectedItem={translate(
                  `appointments.appointment_status.${appointmentDetails?.appointmentStatus}`
                )}
                onItemSelected={onStatusChange}
                dropDownClassName={`${
                  appointmentDetails?.appointmentStatus === "Pending"
                    ? "bg-[#4A13E7]"
                    : appointmentDetails?.appointmentStatus === "Completed"
                    ? "bg-[#45C769]"
                    : "bg-[#D80027]"
                } w-[140px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium me-1"
                dropDownItemsContainerClassName="w-[140px]"
                dropDownIconClassName="text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 xMini:grid-cols-3 items-center mlg:gap-x-20">
            {appointmentDetails?.leadID?.customerDetail?.companyName && (
              <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
                <span className="text-base text-[#5C5C5C] font-medium min-w-[140px]">
                  {translate("appointments.table_headings.company_name")}:
                </span>
                <span className="text-base text-primary font-nomal truncate">
                  {appointmentDetails?.leadID?.customerDetail?.companyName}
                </span>
              </div>
            )}
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.date")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {formatDateTimeToDate(appointmentDetails?.date)}
              </span>
            </div>
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.time")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.startTime} - {appointmentDetails?.endTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
