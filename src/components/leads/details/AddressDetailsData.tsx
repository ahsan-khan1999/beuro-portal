import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

const AddressDetailsData = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const { leadDetails } = useAppSelector((state) => state.lead);
  const { t: translate } = useTranslation();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 border-b border-b-[#000] border-opacity-10"
        id={translate("leads.tabs_headings.address")}
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("leads.address_details.main_heading")}
        </h2>
        <button
          onClick={() => onClick(1, ComponentsType.addressEdit)}
          className="flex  gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-primary py-[7px] px-4 min-w-[161px] w-fit"
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
          {translate("leads.address_details.edit_button")}
        </button>
      </div>

      {leadDetails?.addressID?.address?.map((item, index) => (
        <div className="mt-5" key={index}>
          <h4 className="text-[#8F8F8F] mb-[10px]">{item?.label}</h4>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.address_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.address_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("leads.address_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px]">
                {item?.country}
              </div>
            </div>
          </div>

          <div className="mt-5 w-full">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              {translate("leads.address_details.description")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 break-all text-[#4B4B4B] font-medium min-h-[58px]">
              {item?.description}
            </div>
          </div>
        </div>
      ))}
    </LeadsCardLayout>
  );
};

export default AddressDetailsData;
