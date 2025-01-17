import React from "react";
import { ContactSupport } from "@/api/slices/contactSupport/contactSupportSlice";
import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useTranslation } from "next-i18next";

export const SupportDetailsData = ({
  supportDetail,
}: {
  supportDetail: ContactSupport | null;
}) => {
  const { t: translate } = useTranslation();
  return (
    <LeadsCardLayout>
      <div className="my-5 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.support_requests.details.name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {supportDetail?.createdBy?.fullName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.support_requests.details.company_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {supportDetail?.createdBy?.company?.companyName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.support_requests.details.email_address")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {supportDetail?.createdBy?.email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.support_requests.details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {supportDetail?.createdBy?.company?.mobileNumber}
            </div>
          </div>
        </div>
        <div className="px-2 pb-5 bg-[#EDF4FF]">
          <label className="text-[#4D4D4D] mb-3 block text-sm">
            {translate("admin.support_requests.details.reason_of_contact")}
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
            {supportDetail?.reason}
          </div>
        </div>
        <div className="rounded-b-lg px-2 pb-3 bg-[#EDF4FF]">
          <label className="text-[#4D4D4D] mb-3 block text-sm">
            {translate("admin.support_requests.details.message")}
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white px-4 pt-4 pb-[55px] text-[#4B4B4B] font-medium min-h-[58px] truncate">
            {supportDetail?.message}
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};
