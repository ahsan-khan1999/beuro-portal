import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { Report } from "@/types/appointments";
import { useRouter } from "next/router";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

export interface ReportAdditionalDetailProps {
  isCompanyAppointment?: boolean;
  reportDetail: Report;
}

export const ReportAdditionalInfoDetail = ({
  isCompanyAppointment,
  reportDetail,
}: ReportAdditionalDetailProps) => {
  const router = useRouter();
  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.additional")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("appointments.report_detail.additional_detail")}
        </h2>
        {/* {!isCompanyAppointment && ( */}
          <button
            onClick={() =>
              router.push({
                pathname: "/agent/appointments/update-report",
                query: { report: reportDetail?.appointmentID?.id, tab: 3 },
              })
            }
            className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
          >
            <EditIcon />
            {translate("offers.address_details.edit_button")}
          </button>
        {/* )} */}
      </div>

      <div className="px-5 py-2 pb-5">
        <div className="gap-x-[17px] grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 bg-[#EDF4FF] rounded-lg p-2 gap-y-2">
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.mitarbeiter")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.employees}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.leiferwagen")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.deliveryVehicle}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.stunden")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.hours}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.reingung_mit")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.cleaningWithHandoverGuarantee}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.besenrein")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.broomClean}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.preis_chf")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.priceCHF}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 col-span-3">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.bemerkung")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.remarks}
            </div>
          </div>
        </div>

        <p className="text-[#344054] text-sm font-medium mt-5 mb-2">
          {translate("agent.additional_details_fields.hinweis")}
        </p>
        <div className="bg-[#EDF4FF] rounded-lg p-2">
          <div className="flex flex-col gap-y-1">
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
              {reportDetail?.offerDetails?.noteAndInformation}
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};
