import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";
import { Service } from "@/types/service";
import { DEFAULT_SERVICE } from "@/utils/static";
import { filterLead, formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";

const ServiceDetailsData = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;

}) => {
  const { leadDetails } = useAppSelector(state => state.lead)
  const { service } = useAppSelector(state => state.service)


  let requiredService = filterLead(leadDetails?.requiredService, service) as Service
  let otherServices = filterLead(leadDetails?.otherServices, service) as Service[]

  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 "
        id="Service Details"
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("leads.service_details.heading")}
        </h2>
        <button
          onClick={() => onClick(2, ComponentsType.serviceEdit)}
          className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("leads.service_details.edit_button")}
        </button>
      </div>
      <hr className="opacity-20 mb-5" />

      <div className="mt-5">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.required_service")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {requiredService?.serviceName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.desire_date")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {formatDateTimeToDate(leadDetails?.desireDate)}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.flexibility")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.flexibility}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.availability")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.contactAvailability}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.prefer_contact")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.preferredContact}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.budget")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.budget}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-x-3">
          <div className="xl:col-span-1">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.lead_source")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium">
              {leadDetails?.leadSource}
            </div>
          </div>
          <div className="xl:col-span-2">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("leads.service_details.other_services")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium">
              {
                Array.isArray(otherServices) && otherServices?.map((item) => item.serviceName + ", ")
              }
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default ServiceDetailsData;
