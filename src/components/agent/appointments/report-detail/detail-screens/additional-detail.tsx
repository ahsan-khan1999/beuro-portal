import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { Report } from "@/types/appointments";
import { useRouter } from "next/router";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

export interface ReportAdditionalDetailProps {
  reportDetail: Report;
}

export const ReportAdditionalInfoDetail = ({
  reportDetail,
}: ReportAdditionalDetailProps) => {
  const router = useRouter();
  const { companyAppointment } = router.query;

  const handleEditClick = () => {
    const query: any = router.query;

    query.report = reportDetail?.appointmentID?.id;
    query.tab = 3;

    if (companyAppointment) {
      query.companyAppointment = companyAppointment;
    }
    router.push({
      pathname: "/agent/appointments/update-report",
      query,
    });
  };

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center bg-[#45C769] py-3 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.additional")}
      >
        <h2 className="text-[#fff] text-sm xMini:text-xl font-medium">
          {translate("appointments.report_detail.additional_detail")}
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
        {/* <div className="gap-x-[17px] grid grid-cols-1 xMini:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] rounded-t-lg p-2 gap-y-5">
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.mitarbeiter")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.employees}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.leiferwagen")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.deliveryVehicle}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.stunden")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.hours}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.reingung_mit")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.cleaningWithHandoverGuarantee}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.besenrein")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.broomClean}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-[#344054] text-sm font-medium">
              {translate("agent.additional_details_fields.preis_chf")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.priceCHF}
            </div>
          </div>
        </div> */}

        <div className="flex flex-col gap-y-1 bg-[#EDF4FF] rounded-b-lg px-2 pt-3 pb-2">
          <label className="text-[#344054] text-sm font-medium">
            {translate("agent.additional_details_fields.bemerkung")}
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
            {reportDetail?.offerDetails?.remarks}
          </div>
        </div>

        <p className="text-[#344054] text-sm font-medium mt-5 mb-2">
          {translate("agent.additional_details_fields.hinweis")}
        </p>
        <div className="bg-[#EDF4FF] rounded-lg p-2">
          <div className="flex flex-col gap-y-1">
            <div className="rounded-lg border border-[#EBEBEB] bg-white text-[#4B4B4B] font-medium px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] truncate">
              {reportDetail?.offerDetails?.noteAndInformation}
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};
