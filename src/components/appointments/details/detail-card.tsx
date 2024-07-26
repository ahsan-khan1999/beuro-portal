import { BackIcon } from "@/assets/svgs/components/back-icon";
import { Button } from "@/base-components/ui/button/button";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import profileImg from "@/assets/pngs/agent-profile.png";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";

export interface AppointmentsDetailCardProps {
  onStatusChange: (id: number, status: string, type: string) => void;
  onScheduleAppointments: () => void;
}

export const AppointmentsDetailCard = ({
  onStatusChange,
  onScheduleAppointments,
}: AppointmentsDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    router.pathname = "/appointments";
    updateQuery(router, router.locale as string);
  };

  const itemsValue = [
    `${translate("sidebar.customer.appointments.pending")}`,
    `${translate("sidebar.customer.appointments.completed")}`,
    `${translate("sidebar.customer.appointments.cancelled")}`,
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
          <div className="flex items-center gap-x-[142px]">
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.lead_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                V-2000
              </span>
            </div>
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.status")}:
              </span>
              <DropDown
                items={items}
                selectedItem={translate(
                  `appointments.appointment_status.pending`
                )}
                onItemSelected={(status) => {
                  onStatusChange(0, status, "appointments");
                }}
                dropDownClassName={`bg-[#4A13E7] w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium me-1"
                dropDownItemsContainerClassName="w-full"
                dropDownIconClassName="text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-[128px]">
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.date")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                05/07/2024
              </span>
            </div>
            <div className="flex items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.time")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                16:30 - 18:00
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-[6px]">
          <p className="text-[#5C5C5C] text-base font-medium">
            {translate("appointments.detail_data.assign_agent")}
          </p>
          <div className="flex items-center gap-x-[10px] px-[10px] py-1 bg-[#F4F4F4] rounded-lg w-fit">
            <Image
              src={profileImg}
              alt="agent profile"
              width={32}
              height={32}
            />
            <span className="text-[#191D23] text-base font-medium">
              Jenny Wilson
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
