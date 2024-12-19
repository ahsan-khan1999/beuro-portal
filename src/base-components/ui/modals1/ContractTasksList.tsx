import {
  readContractTaskDetail,
  setContractTaskDetails,
} from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CustomerPromiseActionType } from "@/types/customer";
import Image from "next/image";
import crossIcon from "@/assets/svgs/cross_icon.svg";

export interface ContractTasksListProps {
  onClose: () => void;
}

export const ContractTasksList = ({ onClose }: ContractTasksListProps) => {
  const dispatch = useAppDispatch();
  const { tasks, currentDate } = useAppSelector(
    (state) => state.global.modal.data
  );

  const handleContractTaskDetail = (
    taskID: string,
    clickedStartDate: string,
    clickedEndDate: string
  ) => {
    dispatch(readContractTaskDetail({ params: { filter: taskID } })).then(
      (res: CustomerPromiseActionType) => {
        if (res?.payload) {
          dispatch(
            setContractTaskDetails({
              ...res.payload,
              selectedStartDate: clickedStartDate,
              selectedEndDate: clickedEndDate,
            })
          );
        }
      }
    );
    dispatch(updateModalType({ type: ModalType.READ_CONTRACT_TASK_DETAIL }));
  };

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName={`max-w-[340px] xMini:max-w-[600px] min-h-fit rounded-lg bg-[#F3F3F3] calendarShadow`}
    >
      <div className="rounded-lg bg-white pb-10 relative">
        <Image
          src={crossIcon}
          alt="crossIcon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        <div className="border-b border-b-black border-opacity-20 py-3">
          <span className="text-[#adadad] text-xs xMini:text-lg font-medium  pl-4">
            {currentDate.split(",")[0]}
          </span>
          {currentDate.includes(",") && (
            <>
              {", "}
              <span className="text-[#adadad] text-xs xMini:text-lg font-medium">
                {currentDate.split(",")[1]}
              </span>
            </>
          )}
        </div>
        <div className="pl-10 max-h-[500px] overflow-y-scroll overflow-x-hidden hide-scrollbar">
          {tasks?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() =>
                  handleContractTaskDetail(
                    item.taskID,
                    item?.clickedStartDate,
                    item?.clickedEndDate
                  )
                }
                className={`flex items-center cursor-pointer ${
                  index !== tasks.length - 1
                    ? "border-b border-b-black border-opacity-20"
                    : ""
                } py-2`}
              >
                <span
                  className={`text-[#adadad] text-xs xMini:text-lg font-normal min-w-[80px] xMini:min-w-[120px]`}
                >
                  {item?.hasStartTime
                    ? item?.formattedStartTime
                    : translate("calendar.all_day_task")}
                </span>
                <div className="flex items-center gap-x-4 w-full">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: `${item.colour || "#4A13E7"}`,
                      minHeight: "12px",
                      minWidth: "12px",
                    }}
                  />

                  {item?.title && (
                    <p
                      className="text-[#393939] font-semibold text-[10px] xMini:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-[calc(80%-50px)]"
                      title={item?.title}
                    >
                      {item?.title}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BaseModal>
  );
};
