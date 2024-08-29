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
import { useTranslation } from "next-i18next";
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
  const { t: translate } = useTranslation();
  const { taskDetail } = useAppSelector((state) => state.contract);
  const firstDateRange = taskDetail?.date && taskDetail.date[0];

  const startTime = firstDateRange?.startDate
    ? moment(firstDateRange.startDate).format("HH:mm")
    : "";
  const endTime = firstDateRange?.endDate
    ? moment(firstDateRange.endDate).format("HH:mm")
    : "";

  const isSameDay = moment(firstDateRange?.startDate).isSame(
    firstDateRange?.endDate,
    "day"
  );

  // const handlePDFPreview = () => {
  //   const pdfRoute = `/contract/pdf-preview?offerID=${taskDetail?.id}&isCalendar=true`;
  //   window.open(pdfRoute, "_blank");
  // };

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[300px] xsMini:max-w-[384px] min-h-fit absolute top-[200px] rounded-lg bg-[#F3F3F3] calendarShadow"
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

        <div className="flex items-start justify-between my-5">
          <div className="ml-5 flex flex-col gap-y-2">
            {firstDateRange?.startDate && (
              <div className="flex flex-col gap-y-1">
                <span className="text-[#7A7A7A] text-sm font-medium">
                  {calendarTaskformatDate(firstDateRange.startDate)}
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
            {!isSameDay && firstDateRange?.endDate && (
              <div className="flex flex-col gap-y-1">
                <span className="text-[#7A7A7A] text-sm font-medium">
                  {calendarTaskformatDate(firstDateRange.endDate)}
                </span>
                {endTime !== "00:00" && (
                  <span className="text-[#272727] font-semibold text-sm">{`${endTime}`}</span>
                )}
              </div>
            )}
          </div>

          {/* <Button
            onClick={handlePDFPreview}
            className="!h-fit py-2 px-2 xMini:px-4 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap xMini:mt-6"
            text={translate("invoice.invoice_created_modal.button")}
            id="preview PDF"
            inputType="button"
            iconAlt="button"
          /> */}
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

            <div className="flex flex-col gap-y-1">
              <span className="text-sm font-normal text-[#2A2E3A]">
                {taskDetail?.address?.streetNumber}
              </span>
              <span className="text-sm font-normal text-[#2A2E3A]">
                {taskDetail?.address?.postalCode} {taskDetail?.address?.country}
              </span>
            </div>
          </div>
        )}

        <hr className="opacity-30 -mx-[10px]" />

        <div className="pt-[17px] pb-[5px] flex items-center justify-between">
          <span
            className="text-sm font-normal text-[#272727] cursor-pointer"
            onClick={() => onEditTask(taskDetail?.id)}
          >
            {translate("calendar.edit")}
          </span>
          <CalendarDeleteIcon onClick={() => onDelete(taskDetail?.id)} />
        </div>
      </div>
    </BaseModal>
  );
};
