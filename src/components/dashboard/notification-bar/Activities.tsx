import Image from "next/image";
import React from "react";
import timeIcon from "@/assets/svgs/time.svg";
import { useTranslation } from "next-i18next";
import { Dashboard } from "@/types";
import { formatDateTimeToDate, formatDateTimeToTime } from "@/utils/utility";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const ActivitiesNotificationBar = ({
  dashboard,
}: {
  dashboard: Dashboard | null;
}) => {
  const followUp = dashboard?.Activity?.offerActivity?.map((item) => ({
    name: item?.editedBy,
    description: item?.message,
    time: formatDateTimeToTime(item?.dateTime),
    date: formatDateTimeToDate(item?.dateTime),
    id1: item?.offerNumber,
    id2: item?.contractNumber,
  }));

  const { t: translate } = useTranslation();
  return (
    <div className="bg-white rounded-[20px] h-[397.089px]">
      <h1 className="pb-3 ml-[40px] pt-5 text-[#18181B] font-medium">
        {translate("dashboard_detail.activity")}
      </h1>

      <hr className="opacity-10" />

      {followUp && followUp?.length > 0 ? (
        <div className="overflow-y-scroll max-h-[340px] dashboard_scrollbar pl-5 pr-[5px] pb-[14px] mr-1">
          {followUp?.map((item, index) => {
            return (
              <div
                key={index}
                className={`mt-3 cursor-pointer hover:bg-primary hover:bg-opacity-10 bg-opacity-10 `}
              >
                <div className="mb-3">
                  <div>
                    <span className="text-dark text-sm">{item.name}&nbsp;</span>
                    <span className="text-dark text-sm font-medium">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-[5px]">
                    <div className="flex items-center ">
                      <Image
                        src={timeIcon}
                        alt="Time Icon"
                        className="mr-[10px]"
                      />
                      <span className="text-[#393939] text-xs ">
                        {item.time},{item.date}
                      </span>
                    </div>
                    <div className="lg:flex justify-between items-center hidden ">
                      <span className="mr-3 text-white bg-primary text-xs rounded-[2px] px-1 py-0.5 font-medium">
                        {item.id1}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="11"
                        viewBox="0 0 16 11"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.59296 0.144579L12.5071 2.32761L15.7225 4.73638C15.7931 4.78921 15.8503 4.85776 15.8898 4.93659C15.9292 5.01541 15.9498 5.10235 15.9498 5.19049C15.9498 5.27864 15.9292 5.36557 15.8898 5.4444C15.8503 5.52323 15.7931 5.59178 15.7225 5.64461L12.5071 8.05325L9.59296 10.2363C9.50866 10.2995 9.40843 10.3379 9.30351 10.3473C9.19858 10.3568 9.0931 10.3368 8.99889 10.2897C8.90467 10.2425 8.82544 10.1701 8.77007 10.0805C8.71469 9.99084 8.68537 9.88757 8.68537 9.78223L8.68537 7.48057L0.683594 7.48057L0.683593 2.90029L8.68537 2.90029L8.68537 0.59863C8.68535 0.493273 8.71466 0.389992 8.77003 0.300358C8.8254 0.210724 8.90463 0.138281 8.99886 0.0911423C9.09308 0.0440041 9.19857 0.024036 9.3035 0.0334736C9.40843 0.0429111 9.50866 0.0813843 9.59296 0.144579Z"
                          fill="#FE9244"
                        />
                      </svg>
                      <span className="ml-3 text-white text-xs bg-[#45C769] rounded-[2px] px-1 py-0.5 font-medium">
                        {item.id2}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="opacity-10" />
              </div>
            );
          })}
          {/* <div className="flex justify-center py-4">
          <button className=" text-primary w-fit text-sm font-medium ">
            {translate("dashboard_detail.view_all")}
          </button>
        </div> */}
        </div>
      ) : (
        <NoDataEmptyState />
      )}
    </div>
  );
};

export default ActivitiesNotificationBar;
