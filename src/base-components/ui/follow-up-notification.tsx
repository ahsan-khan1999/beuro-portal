import React from "react";
import infoIcon from "@/assets/svgs/info_icon.svg";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import moment from "moment";

export const FollowUpNotification = ({ followUps }: any) => {
  const { t: translate } = useTranslation();
  console.log(followUps?.customer?.refID);

  return (
    <div className="bg-white rounded-[20px] shadow-followUp w-[560px] absolute top-8 menuItems -right-[2px] mt-7 !z-50 follow-up-container pt-[25px] pb-[28px]">
      <h1 className="text-[#171B1E] text-xl font-semibold pl-[31px] pb-[18px]">
        {translate("common.follow_up_completed")}
      </h1>

      <div className="border-t border-t-[#F5F5F5] pt-[9px]">
        <p className="text-base text-[#616161] font-medium pl-[31px]">
          Details
        </p>

        <div
          className={`flex items-start gap-x-6 pl-[31px] pr-[47px] pt-3 border-b border-b-[#F5F5F5]`}
        >
          <Image src={infoIcon} alt="info" />
          <div className="flex flex-col gap-y-[14px]">
            <p className="text-base font-medium text-[#171B1E]">
              {followUps?.title}
            </p>
            <div className="flex items-center">
              <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] pr-2">
                {moment(followUps?.dateTime).format("hh:mm")}
              </span>
              <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] px-2">
                {moment(followUps?.dateTime).format("DD/MM/YYYY")}
              </span>
              <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] px-2">
                ID {followUps?.customer?.refID}
              </span>
              <span className="text-primary font-normal text-sm pl-2">
                Days {followUps?.days}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
