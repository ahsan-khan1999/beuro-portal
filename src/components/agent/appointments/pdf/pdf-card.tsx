import { BackIcon } from "@/assets/svgs/components/back-icon";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Report } from "@/types/appointments";
import { formatDateTimeToDate } from "@/utils/utility";
import { PrintIcon } from "@/assets/svgs/components/print-icon";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";

export interface AppointmentsDetailCardProps {
  appointmentDetails: Report;
  onDownload: () => void;
  onPrint: () => void;
}

export const AppointmentPdfCard = ({
  appointmentDetails,
  onDownload,
  onPrint,
}: AppointmentsDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handleBack = () => {
    if (router.query.isCompany) {
      router.pathname = "/appointments";
    } else {
      router.pathname = "/agent/appointments";
    }

    delete router.query["appointment"];
    delete router.query["reportId"];
    delete router.query["isCompany"];
    updateQuery(router, router.locale as string);
  };

  return (
    <div className="bg-white pt-5 pl-5 pr-6 pb-[37px] rounded-lg">
      <div className="flex items-center justify-between border-b border-b-[#000] border-opacity-10 pb-5">
        <div className="flex items-center gap-x-4">
          <BackIcon onClick={handleBack} />
          <h1 className="text-[#222B45] text-2xl font-semibold">
            {translate("appointments.detail_heading")}
          </h1>
        </div>
        <div className="flex items-center gap-x-4">
          <PrintIcon onClick={onPrint} />
          <DownloadIcon onClick={onDownload} />
        </div>
      </div>

      <div className="flex flex-col gap-y-5 mlg:gap-y-0 mlg:flex-row justify-between mlg:items-center">
        <div className="flex flex-col gap-y-[34px] mt-[34px]">
          <div className="grid grid-cols-2 xMini:grid-cols-3 items-center mlg:gap-x-20 gap-y-5">
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[65px] w-fit">
                {translate("appointments.detail_data.lead_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.appointmentID?.leadID?.refID}
              </span>
            </div>
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[130px] w-fit">
                {translate("appointments.detail_data.appointment_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.appointmentID?.leadID?.refID}
              </span>
            </div>
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[60px] w-fit">
                {translate("appointments.detail_data.status")}:
              </span>
              <div
                className={`${
                  appointmentDetails?.appointmentID?.appointmentStatus ===
                  "Pending"
                    ? "bg-[#4A13E7]"
                    : appointmentDetails?.appointmentID?.appointmentStatus ===
                      "Completed"
                    ? "bg-[#45C769]"
                    : "bg-[#D80027]"
                } w-[140px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
              >
                <span className="text-sm font-normal text-white">
                  {translate(
                    `appointments.appointment_status.${appointmentDetails?.appointmentID?.appointmentStatus}`
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 xMini:grid-cols-3 items-center mlg:gap-x-20">
            {appointmentDetails?.appointmentID?.leadID?.customerDetail
              ?.companyName && (
              <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
                <span className="text-base text-[#5C5C5C] font-medium">
                  {translate("appointments.table_headings.company_name")}:
                </span>
                <span className="text-base text-[#5C5C5C] font-nomal">
                  {
                    appointmentDetails?.appointmentID?.leadID?.customerDetail
                      ?.companyName
                  }
                </span>
              </div>
            )}
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.date")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {formatDateTimeToDate(appointmentDetails?.appointmentID?.date)}
              </span>
            </div>
            <div className="flex xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <p className="text-base text-[#5C5C5C] font-medium min-w-[100px] w-fit">
                {translate("appointments.detail_data.created_by")}:
              </p>
              <p className="text-base text-[#5C5C5C] font-nomal w-full">
                {appointmentDetails?.appointmentID?.agent?.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
