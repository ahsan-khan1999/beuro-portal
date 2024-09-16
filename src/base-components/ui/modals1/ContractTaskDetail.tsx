import React from "react";
import moment from "moment";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { useAppSelector } from "@/hooks/useRedux";
import {
  calendarTaskformatDate,
  formatAlertTime,
  hasTimeComponent,
} from "@/utils/utility";
import { CalendarAlertIcon } from "@/assets/svgs/components/calendar-alert-icon";
import { CalendarNoteIcon } from "@/assets/svgs/components/calendar-note-icon";
import { CalendarDeleteIcon } from "@/assets/svgs/components/calendar-delete-icon";
import { useTranslation } from "next-i18next";
import { Button } from "../button/button";
import { TaskWithSelectedDates } from "@/types/contract";
import { LocationIcon } from "@/assets/svgs/components/location-icon";
export interface ContractTaskDetailProps {
  onDelete: (id: string) => void;
  onEditTask: (
    id: string,
    clickedStartDate?: string,
    clickedEndDate?: string
  ) => void;
  onClose: () => void;
}

export const ContractTaskDetail = ({
  onClose,
  onDelete,
  onEditTask,
}: ContractTaskDetailProps) => {
  const { t: translate } = useTranslation();
  const taskDetail = useAppSelector(
    (state) => state.contract.taskDetail
  ) as TaskWithSelectedDates;

  const startTime =
    taskDetail?.selectedStartDate &&
    hasTimeComponent(taskDetail.selectedStartDate)
      ? moment(taskDetail.selectedStartDate).format("HH:mm")
      : "";

  const endTime =
    taskDetail?.selectedEndDate && hasTimeComponent(taskDetail.selectedEndDate)
      ? moment(taskDetail.selectedEndDate).format("HH:mm")
      : "";

  const isSameDay = moment(taskDetail?.selectedStartDate).isSame(
    taskDetail?.selectedEndDate,
    "day"
  );

  const handlePDFPreview = () => {
    const pdfRoute = `/contract/pdf-preview?offerID=${taskDetail?.contractID?.id}&isCalendar=true`;
    window.open(pdfRoute, "_blank");
  };

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[300px] xsMini:max-w-[384px] min-h-fit absolute top-[180px] rounded-lg bg-[#F3F3F3] calendarShadow"
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

        <div className="flex items-center justify-between mt-2">
          <p
            style={{ color: `${taskDetail.colour || "#4A13E7"}` }}
            className="text-sm font-normal ml-5"
          >
            {taskDetail?.type}
          </p>
          {taskDetail?.type === "Contract" && (
            <Button
              onClick={handlePDFPreview}
              className="!h-fit py-1 xMini:py-2 px-2 xMini:px-4 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
              text={translate("invoice.invoice_created_modal.button")}
              id="preview PDF"
              inputType="button"
              iconAlt="button"
            />
          )}
        </div>

        {isSameDay && (
          <div className="ml-5 mt-3 mb-5">
            {taskDetail?.selectedStartDate && (
              <div className="flex flex-col gap-y-1">
                <span className="text-[#7A7A7A] text-sm font-medium">
                  {calendarTaskformatDate(taskDetail.selectedStartDate)}
                </span>
                {startTime && endTime ? (
                  <span className="text-[#272727] font-semibold text-sm">
                    {`${startTime} - ${endTime}`}
                  </span>
                ) : startTime ? (
                  <span className="text-[#272727] font-semibold text-sm">{`${startTime}`}</span>
                ) : endTime ? (
                  <span className="text-[#272727] font-semibold text-sm">{`${endTime}`}</span>
                ) : null}
              </div>
            )}
          </div>
        )}

        {!isSameDay && (
          <div className="ml-5 flex flex-col gap-y-1 mt-3 mb-5">
            {taskDetail?.selectedStartDate && (
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                  {startTime && (
                    <span className="text-[#272727] font-semibold text-sm">
                      {startTime} -
                    </span>
                  )}
                  <span className="text-[#7A7A7A] text-sm font-medium">
                    {calendarTaskformatDate(taskDetail?.selectedStartDate)}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  {endTime && (
                    <span className="text-[#272727] font-semibold text-sm">
                      {endTime} -
                    </span>
                  )}
                  <span className="text-[#7A7A7A] text-sm font-medium">
                    {taskDetail?.selectedEndDate &&
                      calendarTaskformatDate(taskDetail?.selectedEndDate)}
                  </span>
                </div>
              </div>
              // <div className="flex flex-col gap-y-1">
              //   <span className="text-[#7A7A7A] text-sm font-medium">
              //     {calendarTaskformatDate(taskDetail.selectedStartDate)}
              //   </span>
              //   {startTime && endTime ? (
              //     <span className="text-[#272727] font-semibold text-sm">
              //       {`${startTime} - ${endTime}`}
              //     </span>
              //   ) : startTime ? (
              //     <span className="text-[#272727] font-semibold text-sm">{`${startTime}`}</span>
              //   ) : endTime ? (
              //     <span className="text-[#272727] font-semibold text-sm">{`${endTime}`}</span>
              //   ) : null}
              // </div>
            )}
            {/* {!isSameDay && taskDetail?.selectedEndDate && (
              <div className="flex flex-col gap-y-1">
                <span className="text-[#7A7A7A] text-sm font-medium">
                  {calendarTaskformatDate(taskDetail.selectedEndDate)}
                </span>
                {endTime && (
                  <span className="text-[#272727] font-semibold text-sm">{`${endTime}`}</span>
                )}
              </div>
            )} */}
          </div>
        )}

        <hr className="opacity-30 -mx-[10px]" />
        <div className="flex items-center justify-between">
          {taskDetail?.alertTime && (
            <div className="flex items-center gap-x-2 mb-3 mt-[18px]">
              <CalendarAlertIcon />
              <p className="text-sm font-normal text-[#2A2E3A]">
                {formatAlertTime(taskDetail.alertTime)}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col max-h-[300px] overflow-y-auto mb-[35px]">
          {taskDetail?.note && (
            <div className="flex items-start gap-x-2">
              <CalendarNoteIcon />

              <div
                className="html-content -mt-1"
                dangerouslySetInnerHTML={{ __html: taskDetail?.note }}
              />
            </div>
          )}

          {taskDetail?.address?.streetNumber && (
            <div className="flex items-start gap-x-2 mt-[14px]">
              <LocationIcon />

              <div className="flex flex-col gap-y-1 -mt-[2px]">
                <span className="text-sm font-normal text-[#2A2E3A]">
                  {taskDetail?.address?.streetNumber}
                </span>
              </div>
            </div>
          )}
        </div>

        <hr className="opacity-30 -mx-[10px]" />

        <div className="pt-[17px] pb-[5px] flex items-center justify-between">
          <span
            className="text-sm font-normal text-[#272727] cursor-pointer"
            onClick={() =>
              onEditTask(
                taskDetail?.id,
                taskDetail?.selectedStartDate,
                taskDetail?.selectedEndDate
              )
            }
          >
            {translate("calendar.edit")}
          </span>
          <CalendarDeleteIcon onClick={() => onDelete(taskDetail?.id)} />
        </div>
      </div>
    </BaseModal>
  );
};
