import React from "react";
import Image from "next/image";
import timeIcon from "@/assets/svgs/time.svg";
import calenderIcon from "@/assets/svgs/calender_with_point.svg";
import { OffersActivityDataTypes } from "@/types/offers";
import { useAppSelector } from "@/hooks/useRedux";
import {
  formatDateTimeToDate,
  formatDateTimeToTime,
} from "../../../../utils/utility";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const Activity = () => {
  const { offerActivity } = useAppSelector((state) => state.offer);
  const activityData: OffersActivityDataTypes[] | null =
    offerActivity &&
    offerActivity?.activity?.map((item) => ({
      activeTime: formatDateTimeToTime(item?.dateTime),
      activeDate: formatDateTimeToDate(item?.dateTime),
      activityMode: "edited Offer:",
      activityName: item?.editedBy,
    }));

  return (
    <>
      {activityData && activityData?.length > 0 ? (
        <div className="max-h-[300px] overflow-y-auto">
          {activityData?.map((item, index) => (
            <div key={index} className="flex flex-col bg-white rounded-b-lg ">
              <div className="pl-[30px] pr-[11px] py-[11px]">
                <div className="flex gap-[5px]">
                  <span className="text-[#4B4B4B] font-normal text-[14px]">
                    {item?.activityName}
                  </span>
                  <span className="text-[#8F8F8F] font-normal text-[14px]">
                    {item?.activityMode}
                  </span>
                </div>

                <div className="mt-2 flex justify-between">
                  <span className="text-[#4B4B4B] font-normal text-[14px] flex items-center ">
                    <Image src={timeIcon} alt="timeIcon" className="mr-3" />
                    {item?.activeTime}
                  </span>
                  <span className="text-[#4B4B4B] font-normal text-[14px] flex items-center">
                    <Image
                      src={calenderIcon}
                      alt="calenderIcon"
                      className="mr-3"
                    />
                    {item?.activeDate}
                  </span>
                </div>
              </div>

              {index !== activityData.length - 1 && (
                <hr className="opacity-20 mx-[11px]" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white -mt-6 py-4">
          <NoDataEmptyState />
        </div>
      )}
    </>
  );
};

export default Activity;
