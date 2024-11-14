import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { useTranslation } from "next-i18next";
import { Report } from "@/types/appointments";
import { staticEnums } from "@/utils/static";
import { getKeyByValue } from "@/utils/auth.util";
import { convertUTCToLocalDate } from "@/utils/utility";

export interface ReportAddressProps {
  reportDetail: Report;
}

export const ReportContactDetail = ({ reportDetail }: ReportAddressProps) => {
  console.log("reportDetail:", reportDetail);
  const router = useRouter();
  const { t: translate } = useTranslation();

  const { companyAppointment } = router.query;

  const handleEditClick = () => {
    const query: any = {
      today: router.query.today,
      report: reportDetail?.appointmentID?.id,
      tab: 0,
    };
    if (companyAppointment) {
      query.companyAppointment = companyAppointment;
    }
    router.push({
      pathname: "/agent/appointments/update-report",
      query,
    });
  };

  let customerType = reportDetail?.customerDetail?.customerType;

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center bg-primary py-3 px-6 rounded-t-lg"
        id={translate("appointments.report_detail.contact_tab")}
      >
        <h2 className="text-[#fff] text-sm xMini:text-xl font-medium">
          {translate("appointments.report_detail.contact_address_detail")}
        </h2>
        <button
          onClick={handleEditClick}
          className="flex items-center gap-x-4 font-medium rounded-lg border border-[#4A13E7] py-[7px] px-3 xMini:px-4 xMini:min-w-[161px] w-fit bg-white text-[#4B4B4B]"
        >
          <EditIcon title={translate("offers.address_details.edit_button")} />
          <span className="hidden xMini:block">
            {translate("offers.address_details.edit_button")}
          </span>
        </button>
      </div>

      <div className="p-[9px] xMini:px-5 xMini:pb-5">
        <div className="gap-x-[17px] gap-y-5 grid grid-cols-1 xMini:grid-cols-2 xlg:grid-cols-3 bg-[#EDF4FF] rounded-lg p-2 mb-5">
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.customer_type")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {translate(
                `customer_type.${getKeyByValue(
                  staticEnums["CustomerType"],
                  customerType
                )}`
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.gender")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {translate(`gender.${reportDetail?.customerDetail?.gender}`)}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.fullName}
            </div>
          </div>
          {customerType === 1 && (
            <div className="flex flex-col gap-y-1">
              <label className="text-[#344054] text-sm font-medium">
                {translate("agent.report_contact_fields.company_name")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                {reportDetail?.customerDetail?.companyName}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.email")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.email}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.telefon")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.phoneNumber}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.mobile")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.mobileNumber}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.desire_date")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.desireDate
                ? convertUTCToLocalDate(reportDetail?.desireDate)
                : ""}
            </div>
          </div>
        </div>

        <h4 className="text-base font-medium xMini:font-semibold text-[#1E1E1E] mb-2">
          {translate("leads.customer_details.address_details")}
        </h4>

        <div className="gap-x-[17px] gap-y-5 grid grid-cols-1 xMini:grid-cols-2 xlg:grid-cols-3 bg-[#EDF4FF] rounded-lg p-2 mb-5">
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.street_no")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.address?.streetNumber}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.report_contact_fields.post_code")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.address?.postalCode}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("leads.customer_details.country")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.customerDetail?.address?.country}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          {reportDetail?.addressID?.address?.map((item, index) => {
            return (
              <div key={index}>
                <h4 className="text-base font-medium xMini:font-semibold text-[#1E1E1E] mb-2">
                  {item?.label}
                </h4>

                <div className="grid grid-cols-12 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]">
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("offers.address_details.street_no")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                      {item?.streetNumber}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("offers.address_details.post_code")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                      {item?.postalCode}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("agent.report_contact_fields.floor")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                      {item?.floor}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("agent.report_contact_fields.room")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                      {item?.room}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("agent.report_contact_fields.lift")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                      {item?.lift
                        ? `${translate("common.yes")}`
                        : `${translate("common.no")}`}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("agent.report_contact_fields.parking_permit")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
                      {item?.parkingPermit === true
                        ? `${translate("common.true")}`
                        : `${translate("common.false")}`}
                    </div>
                  </div>
                  <div className="col-span-12 flex flex-col gap-y-1">
                    <label className="text-[#344054] text-sm font-medium">
                      {translate("agent.report_contact_fields.description")}
                    </label>
                    <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[80px] break-words">
                      {item?.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LeadsCardLayout>
  );
};
