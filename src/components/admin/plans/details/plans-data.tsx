import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { SupportRequestAdmin } from "@/types/admin/support-request";
import React from "react";

const SupportDetailsData = ({
  supportDetail,
}: {
  supportDetail: SupportRequestAdmin;
}) => {
  return (
    <LeadsCardLayout>
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-x-3 mb-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">Name</label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {supportDetail?.name}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Company Name
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {supportDetail?.companyName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Email Address
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {supportDetail?.email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Mobile Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {supportDetail?.mobileNumber}
            </div>
          </div>
        </div>
        <div>
          <label className="text-[#4D4D4D] mb-3 block text-sm">
            Reason of contact
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
            {supportDetail?.contractReason}
          </div>
        </div>
        <div className="mt-5">
          <label className="text-[#4D4D4D] mb-3 block text-sm">Massage</label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white px-4 pt-4 pb-[55px]  text-[#4B4B4B] font-medium">
            {supportDetail?.message}
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default SupportDetailsData;
