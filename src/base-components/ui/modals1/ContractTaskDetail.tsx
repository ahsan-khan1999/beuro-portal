import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { useAppSelector } from "@/hooks/useRedux";
import { calendarTaskformatDate, formatAlertTime } from "@/utils/utility";
import { CalendarAlertIcon } from "@/assets/svgs/components/calendar-alert-icon";
import { CalendarNoteIcon } from "@/assets/svgs/components/calendar-note-icon";
import { CalendarDeleteIcon } from "@/assets/svgs/components/calendar-delete-icon";

export const ContractTaskDetail = ({ onClose }: { onClose: () => void }) => {
  const { taskDetail } = useAppSelector((state) => state.contract);

  console.log(taskDetail);

  const firstDateRange = taskDetail?.date && taskDetail.date[0];

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[384px] min-h-fit absolute top-[200px] rounded-lg bg-[#F3F3F3] calendarShadow"
    >
      <div className="p-[10px]">
        <div className="flex items-center gap-x-2">
          <span className={`w-3 h-3 rounded-full bg-primary`} />
          <span className="text-base font-semibold text-[#3C3C3C]">
            {taskDetail?.title}
          </span>
        </div>

        <div className="ml-5 my-5">
          {calendarTaskformatDate(firstDateRange.startDate)}
        </div>

        <hr className="opacity-30 -mx-[10px]" />
        <div className="flex items-center gap-x-2 mb-3 mt-[18px]">
          <CalendarAlertIcon />
          <p className="text-sm font-normal text-[#2A2E3A]">
            {formatAlertTime(taskDetail.alertTime)}
          </p>
        </div>
        <div className="flex items-center gap-x-2 mb-[35px] max-h-[300px] overflow-y-auto">
          <CalendarNoteIcon />
          <p className="text-sm font-normal text-[#2A2E3A]">
            {taskDetail?.note}
          </p>
        </div>

        <hr className="opacity-30 -mx-[10px]" />

        <div className="pt-[17px] pb-[5px] flex items-center justify-between">
          <span>Edit</span>
          <CalendarDeleteIcon onClick={() => {}} />
        </div>
      </div>
    </BaseModal>
  );
};
