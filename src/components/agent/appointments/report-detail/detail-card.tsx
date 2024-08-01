import { BackIcon } from "@/assets/svgs/components/back-icon";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { formatDateTimeToDate } from "@/utils/utility";
import { Report } from "@/types/appointments";

export interface AppointmentsDetailCardProps {
  onStatusChange: (id: string) => void;
  reportDetail: Report;
}

export const ReportDetailCard = ({
  onStatusChange,
  reportDetail,
}: AppointmentsDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    router.pathname = "/agent/appointments";
    delete router.query["appointment"];
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
        <div className="flex flex-col gap-y-[34px] mt-[34px]">
          <div className="grid grid-cols-2 mlg:grid-cols-3 items-center mlg:gap-x-20 gap-y-5">
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[65px] w-fit">
                {translate("appointments.detail_data.lead_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {reportDetail?.appointmentID?.leadID?.refID}
              </span>
            </div>
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[130px] w-fit">
                {translate("appointments.detail_data.appointment_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {reportDetail?.appointmentID?.leadID?.refID}
              </span>
            </div>
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[60px] w-fit">
                {translate("appointments.detail_data.status")}:
              </span>
              <DropDown
                items={items}
                selectedItem={translate(
                  `appointments.appointment_status.${reportDetail?.appointmentID?.appointmentStatus}`
                )}
                onItemSelected={onStatusChange}
                dropDownClassName={`bg-[#4A13E7] w-[140px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium me-1"
                dropDownItemsContainerClassName="w-[140px]"
                dropDownIconClassName="text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-x-20">
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.date")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {formatDateTimeToDate(reportDetail?.appointmentID?.date)}
              </span>
            </div>
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.time")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {reportDetail?.appointmentID?.startTime} -{" "}
                {reportDetail?.appointmentID?.endTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
