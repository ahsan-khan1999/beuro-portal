import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Task } from "@/types/contract";
import Image from "next/image";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useRedux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { updateContractTask } from "@/api/slices/contract/contractSlice";
import { calculateRemainingTime, formatTimeDifference } from "@/utils/utility";
import { RingIcon } from "./ring-icon";

export interface ContractTaskDetailProps {
  onClose: () => void;
  onUpdateSuccess: () => void;
  onContractDetail: (
    taskID: string,
    clickedStartDate: string,
    clickedEndDate: string
  ) => void;
  remainderAlert: Task | null;
}

export const CalendarRemainderAlert = ({
  onClose,
  onUpdateSuccess,
  remainderAlert,
  onContractDetail,
}: ContractTaskDetailProps) => {
  if (!remainderAlert) return null;

  const remainderAlertVal = [5, 10, 15];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleSubmit, setValue } = useForm();
  const { remainingMinutes, formattedEndTime } = calculateRemainingTime(
    remainderAlert.date[0].endDate
  );

  const remainingTimeFormatted = formatTimeDifference(remainingMinutes);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedTask = {
      ...remainderAlert,
      alertTime: data.alertTime,
    };

    const res = await dispatch(
      updateContractTask({
        data: { ...updatedTask, id: remainderAlert?.id },
        router,
        translate,
      })
    );

    if (res?.payload) {
      onUpdateSuccess();
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[300px] xsMini:max-w-[388px] min-h-fit absolute top-[200px] bg-[#FFF]"
    >
      <div className="relative px-3 pt-3 rounded-lg">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute left-3 top-5 cursor-pointer"
          onClick={onClose}
        />

        <p className="text-lg font-semibold text-center pb-2">
          {translate("common.notifications")}
        </p>
        <hr className="opacity-30 -mx-3" />

        <div className="flex items-start justify-between pt-4 pb-6">
          <div className="flex items-start gap-x-4">
            <span
              className={`w-3 h-3 rounded-full`}
              style={{
                backgroundColor: `${remainderAlert.colour || "#4A13E7"}`,
              }}
            />
            <div className="flex flex-col gap-y-1 -mt-1 max-w-[320px]">
              <span className="text-base font-semibold text-[#3C3C3C] truncate">
                {remainderAlert?.title}
              </span>

              <div className="flex items-center gap-x-1">
                <span className="text-sm font-semibold text-[#407ae9]">
                  {`${translate(
                    "common.starts_in"
                  )} ${remainingTimeFormatted} ${translate(
                    "common._at"
                  )} ${formattedEndTime}`}
                </span>
                <RingIcon />
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="15"
            viewBox="0 0 8 15"
            fill="none"
            className="cursor-pointer"
            onClick={() =>
              onContractDetail(
                remainderAlert?.id,
                remainderAlert?.date?.[0]?.startDate,
                remainderAlert?.date?.[0]?.endDate
              )
            }
          >
            <path
              d="M0.461667 14.0655C0.291259 13.8825 0.206055 13.6659 0.206055 13.4156C0.206055 13.1653 0.291259 12.9489 0.461667 12.7665L5.45463 7.40568L0.444626 2.0266C0.285579 1.85583 0.206055 1.64238 0.206055 1.38623C0.206055 1.13008 0.291259 0.91053 0.461667 0.727568C0.632076 0.544606 0.833839 0.453125 1.06696 0.453125C1.30008 0.453125 1.50161 0.544606 1.67157 0.727568L7.39729 6.89338C7.46545 6.96657 7.51385 7.04585 7.54247 7.13123C7.5711 7.21662 7.58519 7.3081 7.58474 7.40568C7.58474 7.50326 7.57042 7.59474 7.54179 7.68012C7.51316 7.7655 7.465 7.84478 7.39729 7.91797L1.65453 14.0838C1.49548 14.2545 1.29939 14.3399 1.06628 14.3399C0.833157 14.3399 0.631621 14.2485 0.461667 14.0655Z"
              fill="#A5A6AB"
            />
          </svg>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#F2F3F5] -mx-3 px-3 rounded-b-lg"
        >
          <p className="text-center text-sm font-medium py-3 text-[#A5A6AB]">
            {translate("common.remaind_me")}:
          </p>

          <div className="flex items-center justify-between pb-[30px]">
            {remainderAlertVal?.map((item, index) => (
              <button
                key={index}
                type="submit"
                onClick={() => setValue("alertTime", item)}
                className="rounded-full bg-white hover:bg-primary hover:text-white h-[30px] w-20 xMini:h-[35px] xMini:w-[108px] flex items-center justify-center"
              >
                <span className="text-sm font-normal text-center">
                  {item} min
                </span>
              </button>
            ))}
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
