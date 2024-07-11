import React from "react";
import moment from "moment";
import Image from "next/image";
import { BaseModal } from "./modals/base-modal";
import infoIcon from "@/assets/svgs/info_icon.svg";
import useGeneralFollowUp from "@/hooks/follow-up/useGeneralFollowUp";
import { getDaysDifference, getFollowUpStatusColor } from "@/utils/utility";

export const FollowUpNotification = ({ followUp, setIsTimeEnded }: any) => {
  const { translate, handleFollowUpsDetails } = useGeneralFollowUp();

  const onClose = () => setIsTimeEnded(false);
  let days = getDaysDifference(followUp?.createdAt);

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="w-[560px] max-h-[221px] min-h-[231px] rounded-[20px] pt-[25px] pb-[28px] absolute top-[46px] right-[397px] mt-7 follow-up-container border border-primary"
    >
      <div>
        <h1 className="text-[#171B1E] text-xl font-semibold pl-[31px] pb-[18px]">
          {translate("common.follow_up_completed")}
        </h1>

        <div
          onClick={() => handleFollowUpsDetails(followUp?.id)}
          className="border-t border-t-[#F5F5F5] pt-[9px] cursor-pointer"
        >
          <p className="text-base text-[#616161] font-medium pl-[31px]">
            {translate("common.details")}
          </p>

          <div
            className={`flex items-start gap-x-6 pl-[31px] pr-[47px] pt-3 border-b border-b-[#F5F5F5]`}
          >
            <Image src={infoIcon} alt="info" />
            <div className="flex flex-col">
              <p className="text-lg font-medium text-[#171B1E]">
                {followUp?.customer?.fullName}
              </p>
              <p className="text-base font-medium text-[#171B1E] mt-[2px]">
                {followUp?.title}
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-[${getFollowUpStatusColor(
                    followUp?.status
                  )}] border border-[${getFollowUpStatusColor(
                    followUp?.status
                  )}] font-medium text-sm mr-2 p-1 rounded-lg`}
                >
                  {followUp?.status}
                </span>
                <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] pr-2">
                  {moment(followUp?.dateTime).format("hh:mm")}
                </span>
                <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] px-2">
                  {moment(followUp?.dateTime).format("DD/MM/YYYY")}
                </span>
                <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] px-2">
                  ID {followUp?.customer?.refID}
                </span>
                <span className="text-primary font-normal text-sm pl-2">
                  Days {days}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
