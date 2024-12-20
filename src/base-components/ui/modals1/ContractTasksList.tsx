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
import { CompanyLogoLoader } from "../loader/company-logo-loader";
import { useEffect, useRef, useState } from "react";

export interface ContractTasksListProps {
  onClose: () => void;
}

export const ContractTasksList = ({ onClose }: ContractTasksListProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.contract);
  const { tasks, currentDate } = useAppSelector(
    (state) => state.global.modal.data || {}
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => checkOverflow(), 0);

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [tasks]);

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
      <div
        className={`rounded-lg bg-white ${
          isOverflowing ? "pb-4" : "pb-8"
        } relative`}
      >
        <Image
          src={crossIcon}
          alt="crossIcon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <CompanyLogoLoader />
          </div>
        ) : (
          <>
            <div className="border-b border-b-black border-opacity-20 py-3">
              <span className="text-[#adadad] text-xs xMini:text-lg font-medium pl-4">
                {currentDate?.split(",")[0]}
              </span>
              {currentDate?.includes(",") && (
                <>
                  <span className="text-[#adadad] text-xs xMini:text-lg font-medium">
                    {", "}
                    {currentDate?.split(",")[1]}
                  </span>
                </>
              )}
            </div>
            <div
              ref={contentRef}
              className="pl-4 xMini:pl-10 max-h-[500px] overflow-y-scroll overflow-x-hidden hide-scrollbar"
            >
              {tasks?.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      handleContractTaskDetail(
                        item?.taskID,
                        item?.clickedStartDate,
                        item?.clickedEndDate
                      )
                    }
                    className={`flex items-center cursor-pointer ${
                      index !== tasks?.length - 1
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
                    <div className="flex items-center gap-x-4 max-w-[230px] xMini:max-w-[430px]">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: `${item?.colour || "#4A13E7"}`,
                          minHeight: "12px",
                          minWidth: "12px",
                        }}
                      />

                      {item?.title && (
                        <p
                          className="text-[#393939] font-semibold text-[10px] xMini:text-sm truncate whitespace-nowrap overflow-hidden text-ellipsis w-full"
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

            {isOverflowing && (
              <div className="text-center text-xs xMini:text-sm font-medium text-[#393939] py-3">
                {translate("common.scroll_down")}...
              </div>
            )}
          </>
        )}
      </div>
    </BaseModal>
  );
};
