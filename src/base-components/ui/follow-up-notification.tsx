import React from "react";
import infoIcon from "@/assets/svgs/info_icon.svg";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import moment from "moment";
import { BaseModal } from "./modals/base-modal";
import { getDaysDifference } from "@/utils/utility";

export const FollowUpNotification = ({ followUp, setIsTimeEnded }: any) => {
  const { t: translate } = useTranslation();

  const onClose = () => setIsTimeEnded(false);
  let days = getDaysDifference(followUp.createdAt);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-[560px] max-h-[204px] min-h-[204px] rounded-[20px] pt-[25px] pb-[28px] absolute top-14 right-[21.5%] mt-7 follow-up-container"
    >
      {/* <div className="bg-white rounded-[20px] shadow-followUp w-[560px] absolute top-8 menuItems -right-[2px] mt-7 !z-50 follow-up-container pt-[25px] pb-[28px]"> */}
      <div>
        <h1 className="text-[#171B1E] text-xl font-semibold pl-[31px] pb-[18px]">
          {translate("common.follow_up_completed")}
        </h1>

        <div className="border-t border-t-[#F5F5F5] pt-[9px]">
          <p className="text-base text-[#616161] font-medium pl-[31px]">
            {translate("common.details")}
          </p>

          <div
            className={`flex items-start gap-x-6 pl-[31px] pr-[47px] pt-3 border-b border-b-[#F5F5F5]`}
          >
            <Image src={infoIcon} alt="info" />
            <div className="flex flex-col gap-y-[14px]">
              <p className="text-base font-medium text-[#171B1E]">
                {followUp?.title}
              </p>
              <div className="flex items-center">
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
      {/* </div> */}
    </BaseModal>
  );
};
