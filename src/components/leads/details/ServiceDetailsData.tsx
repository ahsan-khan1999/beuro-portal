import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";

const ServiceDetailsData = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;

}) => {
  const { leadDetails } = useAppSelector(state => state.lead)


  return (
    <LeadsCardLayout>
      <div className="flex justify-between items-center pb-5 " id="Service Details">
        <h2 className="text-[#393939] text-lg font-medium">Service Details</h2>
        <button
          onClick={() => onClick(2, ComponentsType.serviceEdit)}
          className="flex gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          Edit Details
        </button>
      </div>
      <hr className="opacity-20 mb-5" />

      <div className="mt-5">
        <div className="grid grid-cols-3 gap-x-3 mb-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Required Service
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.requiredService instanceof Object && leadDetails?.requiredService?.serviceName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Desire Date
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.desireDate}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Flexibility
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.flexibility}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Contact Availability
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.contactAvailability}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Preferred Contact
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.preferredContact}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">Budget</label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {leadDetails?.budget}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Lead Source
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium">
              {leadDetails?.leadSource}
            </div>
          </div>
          <div className="col-span-2">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Other Services
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium">
              {Array.isArray(leadDetails?.otherServices)
                && leadDetails?.otherServices.map((item) =>
                  item instanceof Object && item?.serviceName
                )
              }
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default ServiceDetailsData;
