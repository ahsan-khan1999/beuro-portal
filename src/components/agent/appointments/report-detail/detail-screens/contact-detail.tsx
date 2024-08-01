import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { useTranslation } from "next-i18next";
import { Report } from "@/types/appointments";

export const ReportContactDetail = ({
  reportDetail,
}: {
  reportDetail: Report;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg"
        id={translate("appointments.report_detail.contact_tab")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("appointments.report_detail.contact_address_detail")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/agent/appointments/update-report",
              query: { report: reportDetail?.appointmentID?.id },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
        >
          <EditIcon />
          {translate("offers.address_details.edit_button")}
        </button>
      </div>

      <div className="px-5 py-2 pb-5">
        <div className="gap-x-[17px] grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 bg-[#EDF4FF] rounded-lg p-2 mb-5">
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.customerDetail?.fullName}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.email")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.customerDetail?.email}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.telefon")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.customerDetail?.phoneNumber}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          {reportDetail?.addressID?.address?.map((item, index) => (
            <div key={index}>
              <h4 className="text-base font-semibold text-[#1E1E1E] mb-2">
                {item?.label}
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
                <div className="flex flex-col gap-y-1">
                  <label className="text-[#344054] text-sm font-medium">
                    {translate("offers.address_details.street_no")}
                  </label>
                  <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                    {item?.streetNumber}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="text-[#344054] text-sm font-medium">
                    {translate("offers.address_details.post_code")}
                  </label>
                  <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                    {item?.postalCode}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="text-[#344054] text-sm font-medium">
                    {translate("agent.report_contact_fields.floor")}
                  </label>
                  <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                    {item?.floor}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="text-[#344054] text-sm font-medium">
                    {translate("agent.report_contact_fields.room")}
                  </label>
                  <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                    {item?.room}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="text-[#344054] text-sm font-medium">
                    {translate("agent.report_contact_fields.lift")}
                  </label>
                  <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                    {item?.lift}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="text-[#344054] text-sm font-medium">
                    {translate("agent.report_contact_fields.parking_permit")}
                  </label>
                  <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                    {item?.parkingPermit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LeadsCardLayout>
  );
};
