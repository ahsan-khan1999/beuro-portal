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

  const isSameDay = moment(taskDetail?.selectedStartDate)
    .startOf("day")
    .isSame(moment(taskDetail?.selectedEndDate).startOf("day"), "day");

  const handlePDFPreview = () => {
    const pdfRoute = `/contract/pdf-preview?offerID=${taskDetail?.contractID?.id}&isCalendar=true`;
    window.open(pdfRoute, "_blank");
  };

  const isSameDateAlldayTask = taskDetail?.selectedEndDate === "Invalid date";

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[340px] xsMini:max-w-[384px] min-h-fit absolute top-[180px] rounded-lg bg-[#F3F3F3] calendarShadow"
    >
      <div className="pt-[15px] px-[10px] pb-[10px]">
        {/* <div className="flex items-start justify-between"> */}
        <div className="flex items-start gap-x-[8px]">
          <span
            className={`w-3 h-3 rounded-full`}
            style={{
              backgroundColor: `${taskDetail.colour || "#4A13E7"}`,
              minHeight: "12px",
              minWidth: "12px",
            }}
          />
          {taskDetail?.title && (
            <span className="text-base font-semibold text-[#3C3C3C] -mt-1">
              {taskDetail?.title}
            </span>
          )}
        </div>

        {/* {taskDetail?.type === "Contract" && (
            <Button
              onClick={handlePDFPreview}
              className="!h-fit py-1 xMini:py-2 px-2 xMini:px-4 hidden xMini:flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
              text={translate("invoice.invoice_created_modal.button")}
              id="preview PDF"
              inputType="button"
              iconAlt="button"
            />
          )} */}
        {/* </div> */}

        <div className="flex items-center justify-between mt-[9px]">
          <p
            style={{ color: `${taskDetail.colour || "#4A13E7"}` }}
            className="text-sm font-medium ml-5"
          >
            {taskDetail?.type}
          </p>
          {taskDetail?.type === "Contract" && (
            <Button
              onClick={handlePDFPreview}
              className="!h-fit py-1 xMini:py-2 px-2 xMini:px-4 hidden xMini:flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
              text={translate("invoice.invoice_created_modal.button")}
              id="preview PDF"
              inputType="button"
              iconAlt="button"
            />
          )}
        </div>

        {isSameDateAlldayTask && (
          <div className="ml-5 mt-[6px]">
            {taskDetail?.selectedStartDate && (
              <div className="flex flex-col gap-y-1">
                <span className="text-[#7A7A7A] text-sm font-medium">
                  {calendarTaskformatDate(taskDetail?.selectedStartDate)}
                </span>
                <span className="text-[#3C3C3C] text-sm font-semibold">
                  {translate("calendar.all_day_task")}
                </span>
              </div>
            )}
          </div>
        )}

        {isSameDay && (
          <div className="ml-5 mt-[6px]">
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

        {!isSameDay && !isSameDateAlldayTask && (
          <div className="ml-5 flex flex-col gap-y-1 mt-[6px]">
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
            )}
          </div>
        )}

        {taskDetail?.createdBy?.company?.companyName && (
          <div className="mt-[9px] mb-4 flex flex-col gap-y-1 ml-5">
            <span className="text-[#7A7A7A] text-sm font-medium">Company</span>

            <span className="text-[#272727] font-semibold text-sm">
              {taskDetail?.createdBy?.company?.companyName}
            </span>
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

        <div className="flex flex-col max-h-[250px] hide-scrollbar overflow-y-auto mb-[35px]">
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
          <div
            onClick={() =>
              onEditTask(
                taskDetail?.id,
                taskDetail?.selectedStartDate,
                taskDetail?.selectedEndDate
              )
            }
            className="py-[6px] px-4 rounded-md cursor-pointer bg-primary hover:bg-buttonHover"
          >
            <span className="text-sm font-normal text-white">
              {translate("calendar.edit")}
            </span>
          </div>
          <CalendarDeleteIcon onClick={() => onDelete(taskDetail?.id)} />
        </div>
      </div>
    </BaseModal>
  );
};
