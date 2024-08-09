import React from "react";
import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { ComponentsType } from "./LeadsDetailsData";
import { useAppSelector } from "@/hooks/useRedux";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { ContentTableRowTypes } from "@/types/content";

export const LeadServiceDetailsData = ({
  onClick,
  isAgent,
}: {
  onClick?: (index: number, component: ComponentsType) => void;
  isAgent?: boolean;
}) => {
  const { t: translate } = useTranslation();
  const { leadDetails } = useAppSelector((state) => state.lead);
  const content = leadDetails?.requiredService as ContentTableRowTypes;
  const contentList = leadDetails?.otherServices as ContentTableRowTypes[];

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center bg-[#C50EE0] py-5 px-6 rounded-t-lg"
        id={translate("leads.tabs_headings.service")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("leads.service_details.heading")}
        </h2>
        {!isAgent && (
          <button
            onClick={() => onClick && onClick(2, ComponentsType.serviceEdit)}
            className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-primary py-[7px] px-4 min-w-[161px] w-fit bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <g clipPath="url(#clip0_1241_60323)">
                <path
                  d="M16.4138 10.197C15.953 10.197 15.5806 10.5704 15.5806 11.0303V17.697C15.5806 18.1561 15.2072 18.5303 14.7473 18.5303H3.08057C2.62051 18.5303 2.24728 18.1561 2.24728 17.697V6.03027C2.24728 5.57114 2.62051 5.19699 3.08057 5.19699H9.74728C10.2081 5.19699 10.5806 4.82361 10.5806 4.36371C10.5806 3.90366 10.2081 3.53027 9.74728 3.53027H3.08057C1.70224 3.53027 0.580566 4.65195 0.580566 6.03027V17.697C0.580566 19.0753 1.70224 20.197 3.08057 20.197H14.7473C16.1256 20.197 17.2473 19.0753 17.2473 17.697V11.0303C17.2473 10.5695 16.8747 10.197 16.4138 10.197Z"
                  fill="#4A13E7"
                />
                <path
                  d="M8.39401 9.43707C8.33572 9.49536 8.2965 9.56952 8.27987 9.64948L7.69073 12.5963C7.66326 12.7328 7.7066 12.8737 7.80486 12.9728C7.88406 13.052 7.99072 13.0945 8.09997 13.0945C8.12652 13.0945 8.15414 13.092 8.1816 13.0862L11.1275 12.4971C11.2091 12.4803 11.2833 12.4412 11.3408 12.3828L17.9341 5.78946L14.9882 2.84375L8.39401 9.43707Z"
                  fill="#4A13E7"
                />
                <path
                  d="M19.9707 0.806664C19.1583 -0.005867 17.8366 -0.005867 17.0248 0.806664L15.8716 1.95992L18.8174 4.90578L19.9707 3.75237C20.3641 3.35992 20.5807 2.83654 20.5807 2.2799C20.5807 1.72326 20.3641 1.19988 19.9707 0.806664Z"
                  fill="#4A13E7"
                />
              </g>
              <defs>
                <clipPath id="clip0_1241_60323">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.580566 0.158203)"
                  />
                </clipPath>
              </defs>
            </svg>
            {translate("leads.service_details.edit_button")}
          </button>
        )}
      </div>

      <div className="py-3 px-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.required_service")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {content?.contentName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.desire_date")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {formatDateTimeToDate(leadDetails?.desireDate)}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.availability")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {leadDetails?.contactAvailability}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.flexibility")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {leadDetails?.flexibility === "0"
                ? translate("common.flexible")
                : leadDetails?.flexibility}
              {leadDetails?.flexibility == "0"
                ? ""
                : leadDetails?.flexibility == "1"
                ? translate("common.day")
                : translate("common.days")}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.prefer_contact")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {leadDetails?.preferredContact}
            </div>
          </div>

          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.lead_source")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {leadDetails?.leadSource}
            </div>
          </div>
          {/* <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.budget")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
              {leadDetails?.budget}
            </div>
          </div> */}
        </div>

        <div className="rounded-b-lg px-2 pb-3 bg-[#EDF4FF]">
          {/* <div className="xl:col-span-1">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.lead_source")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {leadDetails?.leadSource}
            </div>
          </div> */}
          <div className="xl:col-span-2">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.other_services")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 overflow-hidden whitespace-nowrap min-h-[58px] truncate">
              <span className="overflow-hidden text-[#4B4B4B] font-medium text-overflow-ellipsis">
                {Array.isArray(contentList) &&
                  contentList?.map((item) => item?.contentName + ", ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};
