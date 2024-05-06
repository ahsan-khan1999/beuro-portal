import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { FollowUpServicesDetailsProps } from "@/types/follow-up";
import { useTranslation } from "next-i18next";

type details = {
  label: string;
  value: string;
};

const FollowUpServiceDetails = ({ onClose }: FollowUpServicesDetailsProps) => {
  const { t: translate } = useTranslation();
  const detailsData: details[] = [
    {
      label: `${translate("follow_up.service_details.required_service")}`,
      value: "Cleaning",
    },
    {
      label: `${translate("follow_up.service_details.desire_date")}`,
      value: "12/09/2023",
    },
    {
      label: `${translate("follow_up.service_details.availability")}`,
      value: "Morning(9am to 12am)",
    },
    {
      label: `${translate("follow_up.service_details.flexibility")}`,
      value: "25/09 to 28/09",
    },
    {
      label: `${translate("follow_up.service_details.prefer_contact")}`,
      value: "Via Email",
    },
    {
      label: `${translate("follow_up.service_details.budget")}`,
      value: "Less then 1000CHF",
    },
    {
      label: `${translate("follow_up.service_details.lead_source")}`,
      value: "Instagram",
    },
    {
      label: `${translate("follow_up.service_details.other_services")}`,
      value: "Cleaning, Moving, Painting",
    },
  ];

  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[862.597px] min-h-auto max-h-fit"
      >
        <div className="relative pt-[26px] pb-[40px] pl-[31px] pr-[24px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <div className="flex flex-col">
            <h2 className="font-medium text-[18px] text-[#393939] mb-[23px]">
              {translate("follow_up.service_details.heading")}
            </h2>

            <hr className="opacity-10" />

            <section className="grid grid-cols-3 gap-x-3 mt-[33px]">
              {detailsData.map((item, index) => (
                <div className="flex flex-col gap-y-[10px] mb-5" key={index}>
                  <p className="text-sm font-normal">{item.label}</p>
                  <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </section>

            <section className="flex flex-col gap-y-[10px]">
              <p className="text-sm font-normal ">
                {translate("follow_up.additional_detail_heading")}
              </p>
              <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base"></span>
            </section>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default FollowUpServiceDetails;
