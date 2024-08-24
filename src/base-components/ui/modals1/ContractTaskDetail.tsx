import React from "react";
import moment from "moment";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { useAppSelector } from "@/hooks/useRedux";
import { calendarTaskformatDate, formatAlertTime } from "@/utils/utility";
import { CalendarAlertIcon } from "@/assets/svgs/components/calendar-alert-icon";
import { CalendarNoteIcon } from "@/assets/svgs/components/calendar-note-icon";
import { CalendarDeleteIcon } from "@/assets/svgs/components/calendar-delete-icon";
import addressLocationIcon from "@/assets/pngs/address-location-icon.png";
import Image from "next/image";

export interface ContractTaskDetailProps {
  onDelete: (id: string) => void;
  onEditTask: (id: string) => void;
  onClose: () => void;
}

export const ContractTaskDetail = ({
  onClose,
  onDelete,
  onEditTask,
}: ContractTaskDetailProps) => {
  const { taskDetail } = useAppSelector((state) => state.contract);

  const firstDateRange = taskDetail?.date && taskDetail.date[0];

  // Format the time
  const startTime = firstDateRange
    ? moment(firstDateRange.startDate).format("HH:mm")
    : "";
  const endTime = firstDateRange
    ? moment(firstDateRange.endDate).format("HH:mm")
    : "";

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[384px] min-h-fit absolute top-[200px] rounded-lg bg-[#F3F3F3] calendarShadow"
    >
      <div className="p-[10px]">
        <div className="flex items-center gap-x-2">
          <span
            className={`w-3 h-3 rounded-full`}
            style={{ backgroundColor: `${taskDetail.colour || "#4A13E7"}` }}
          />
          {taskDetail?.title && (
            <span className="text-base font-semibold text-[#3C3C3C]">
              {taskDetail?.title}
            </span>
          )}
        </div>

        <div className="ml-5 flex flex-col gap-y-2 my-5">
          {firstDateRange.startDate && (
            <div className="flex flex-col gap-y-1">
              <span className="text-[#7A7A7A] text-sm font-medium">
                {calendarTaskformatDate(firstDateRange.startDate)}
              </span>
              <span className="text-[#272727] font-semibold text-sm">{`${startTime} - ${endTime}`}</span>
            </div>
          )}
          {firstDateRange.endDate && (
            <div className="flex flex-col gap-y-1">
              <span className="text-[#7A7A7A] text-sm font-medium">
                {calendarTaskformatDate(firstDateRange.endDate)}
              </span>
              <span className="text-[#272727] font-semibold text-sm">{`${startTime} - ${endTime}`}</span>
            </div>
          )}
        </div>

        <hr className="opacity-30 -mx-[10px]" />
        {taskDetail?.alertTime && (
          <div className="flex items-center gap-x-2 mb-3 mt-[18px]">
            <CalendarAlertIcon />
            <p className="text-sm font-normal text-[#2A2E3A]">
              {formatAlertTime(taskDetail.alertTime)}
            </p>
          </div>
        )}
        {taskDetail?.note && (
          <div className="flex items-center gap-x-2 max-h-[300px] overflow-y-auto">
            <CalendarNoteIcon />
            <p className="text-sm font-normal text-[#2A2E3A]">
              {taskDetail?.note}
            </p>
          </div>
        )}

        {taskDetail?.address && (
          <div className="flex items-start gap-x-2 mb-[35px] mt-[14px]">
            <Image
              src={addressLocationIcon}
              alt="location"
              width={16}
              height={16}
            />

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.86456 0.492188C4.98962 0.492188 2.65063 2.83118 2.65063 5.70612C2.65063 9.31961 7.86969 15.4922 7.86969 15.4922C7.86969 15.4922 13.0785 9.14191 13.0785 5.70612C13.0785 2.83118 10.7396 0.492188 7.86456 0.492188ZM9.43771 7.23276C9.00394 7.66644 8.4343 7.88333 7.86456 7.88333C7.29492 7.88333 6.7251 7.66644 6.2915 7.23276C5.42404 6.36539 5.42404 4.95401 6.2915 4.08655C6.71155 3.66632 7.27029 3.43488 7.86456 3.43488C8.45883 3.43488 9.01749 3.66641 9.43771 4.08655C10.3052 4.95401 10.3052 6.36539 9.43771 7.23276Z"
                fill="#616161"
              />
            </svg> */}

            <div className="flex flex-col gap-y-1">
              <span className="text-sm font-normal text-[#2A2E3A]">
                {taskDetail?.address?.streetNumber}
              </span>
              <span className="text-sm font-normal text-[#2A2E3A]">
                {taskDetail?.address?.postalCode} {taskDetail?.address?.country}
              </span>
              {/* <span className="text-sm font-normal text-[#2A2E3A]">
                {taskDetail?.address?.postalCode}
              </span> */}
            </div>
          </div>
        )}

        <hr className="opacity-30 -mx-[10px]" />

        <div className="pt-[17px] pb-[5px] flex items-center justify-between">
          <span
            className="text-sm font-normal text-[#272727] cursor-pointer"
            onClick={() => onEditTask(taskDetail?.id)}
          >
            Edit
          </span>
          <CalendarDeleteIcon onClick={() => onDelete(taskDetail?.id)} />
        </div>
      </div>
    </BaseModal>
  );
};
