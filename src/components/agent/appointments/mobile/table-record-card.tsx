import { CompanyIcon } from "@/assets/svgs/components/company-icon";
import { DateIcon } from "@/assets/svgs/components/date-icon";
import { UserIcon } from "@/assets/svgs/components/use-icon";
import { Button } from "@/base-components/ui/button/button";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import { Appointments } from "@/types/appointments";
import { formatDateTimeToDate } from "@/utils/utility";
import { useRouter } from "next/router";

export interface AppointmentMobileRecordsProps {
  dataToAdd: Appointments[];
}

export const AppointmentTableRecordCard = ({
  dataToAdd,
}: AppointmentMobileRecordsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-5">
      {dataToAdd.map((item, index) => {
        const handlePdfPreview = () => {
          router.push({
            pathname: `/agent/appointments/pdf`,
            query: { ...router.query, reportId: item?.id },
          });
        };

        const handleAppointmentRoute = () => {
          router.push({
            pathname: "/agent/appointments/report-detail",
            query: { ...router.query, report: item?.id },
          });
        };

        const handleReportDetail = () => {
          router.push({
            pathname: "/agent/appointments/details",
            query: {
              ...router.query,
              appointment: item?.id,
            },
          });
        };

        return (
          <div
            className="pl-5 pb-5 pt-[14px] pr-[14px] bg-white rounded-lg cursor-pointer"
            key={index}
            onClick={handleAppointmentRoute}
          >
            <div className="flex flex-col gap-y-1">
              <div className="flex items-start justify-between gap-x-3">
                <div className="flex items-start gap-x-2">
                  <UserIcon />
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                      <p className="p-1 rounded-[4px] text-[10px] font-medium text-white text-center bg-[#FF376F]">
                        {item?.leadID?.refID}
                      </p>
                      <p className="p-1 rounded-[4px] text-[10px] font-medium text-white text-center bg-primary">
                        {item?.leadID?.refID}
                      </p>
                    </div>
                    <h2 className="text-[#4A4543] text-base font-medium break-all">
                      {item?.leadID?.customerDetail?.fullName}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-y-1 min-w-[130px]">
                  <p
                    className={`${
                      item?.appointmentStatus === "Pending"
                        ? "bg-[#4A13E7]"
                        : item?.appointmentStatus === "Completed"
                        ? "bg-[#45C769]"
                        : "bg-[#D80027]"
                    } w-full rounded-lg p-1 text-center text-white text-xs`}
                  >
                    {item?.appointmentStatus}
                  </p>

                  {item?.isReportSubmitted ? (
                    <OutlineButton
                      inputType="button"
                      onClick={handlePdfPreview}
                      className="bg-white text-primary w-full border border-primary py-1 px-1 !h-fit text-xs"
                      text={translate("appointments.view_reports_btn")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  ) : (
                    <Button
                      inputType="button"
                      onClick={handleReportDetail}
                      className="!h-fit py-1 px-1 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
                      text={translate("appointments.sub_report")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-y-1">
                {item?.leadID?.customerDetail?.companyName && (
                  <div className="flex items-center gap-x-4">
                    <CompanyIcon />
                    <p className="text-[#616161] font-normal text-sm">
                      {item?.leadID?.customerDetail?.companyName}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-x-4">
                  <DateIcon />
                  <p className="text-[#616161] font-normal text-sm">
                    {formatDateTimeToDate(item.date)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
