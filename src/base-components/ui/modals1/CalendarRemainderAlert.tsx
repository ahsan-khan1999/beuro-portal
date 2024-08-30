import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import moment from "moment";
import { Task } from "@/types/contract";

export interface ContractTaskDetailProps {
  onClose: () => void;
  remainderAlert: Task | null; // Receive the reminderEvent as a prop
}

export const CalendarRemainderAlert = ({
  onClose,
  remainderAlert,
}: ContractTaskDetailProps) => {
  if (!remainderAlert) return null; // Handle case where there is no reminderEvent

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[300px] xsMini:max-w-[384px] min-h-fit absolute top-[200px] rounded-lg bg-[#F3F3F3] calendarShadow"
    >
      <div className="p-[10px]">
        {/* Render the reminder event details */}
        <h2 className="text-base font-semibold pb-3">Reminder</h2>
        <hr className="opacity-30" />
        <div className="flex items-center gap-x-2 my-3">
          <span
            className={`w-3 h-3 rounded-full`}
            style={{ backgroundColor: `${remainderAlert.colour || "#4A13E7"}` }}
          />
          <span className="text-base font-semibold text-[#3C3C3C]">
            {remainderAlert.title}
          </span>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="text-sm text-[#7A7A7A]">
            Starts at:{" "}
            {moment(remainderAlert.date[0].startDate).format("HH:mm, MMMM Do")}
          </span>
          <span className="text-sm text-[#7A7A7A]">
            Ends at:{" "}
            {moment(remainderAlert.date[0].endDate).format("HH:mm, MMMM Do")}
          </span>
          <span className="text-sm text-[#7A7A7A]">
            Reminder: {remainderAlert.alertTime} minutes before start
          </span>
          {remainderAlert.note && (
            <span className="text-sm text-[#7A7A7A]">
              Note: {remainderAlert.note}
            </span>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
