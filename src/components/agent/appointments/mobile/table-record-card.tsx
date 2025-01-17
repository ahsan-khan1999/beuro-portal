import { CompanyIcon } from "@/assets/svgs/components/company-icon";
import { DateIcon } from "@/assets/svgs/components/date-icon";
import { LocationFilledIcon } from "@/assets/svgs/components/location-filled-icon";
import { UserIcon } from "@/assets/svgs/components/use-icon";
import { Button } from "@/base-components/ui/button/button";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import { Appointments } from "@/types/appointments";
import { viewConvertUTCToLocalDate } from "@/utils/utility";
import { useRouter } from "next/router";

export interface AppointmentMobileRecordsProps {
  dataToAdd: Appointments[];
}

export const AppointmentTableRecordCard = ({
  dataToAdd,
}: AppointmentMobileRecordsProps) => {
  const router = useRouter();

  const handleClickRow = (isSubmited: boolean, id: string) => {
    if (isSubmited) {
      router.push({
        pathname: "/agent/appointments/report-detail",
        query: { ...router.query, reportId: id },
      });
    } else {
      router.push({
        pathname: "/agent/appointments/details",
        query: {
          ...router.query,
          appointment: id,
        },
      });
    }
  };

  const handlePreview = (id: string) => {
    router.push({
      pathname: `/agent/appointments/pdf`,
      query: { ...router.query, reportId: id },
    });
  };

  return (
    <div className="flex flex-col gap-y-3">
      {dataToAdd?.map((item, index) => {
        return (
          <div
            className="pl-5 pb-5 pt-[14px] pr-[14px] bg-white rounded-lg cursor-pointer"
            key={index}
            onClick={() => handleClickRow(item?.isReportSubmitted, item.id)}
          >
            <div className="flex flex-col gap-y-1">
              <div className="flex items-start justify-between gap-x-3">
                <div className="flex items-start gap-x-2">
                  <UserIcon />
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                      {/* <p className="p-1 rounded-[4px] text-[10px] font-medium text-white text-center bg-[#FF376F]">
                        {item?.leadID?.refID}
                      </p> */}
                      <p className="h-4 px-[5px] rounded-[4px] bg-primary flex items-center justify-center">
                        <span className="text-[10px] font-medium text-white">
                          {item?.leadID?.refID}
                        </span>
                      </p>
                    </div>
                    <p className="text-[#4A4543] text-base font-medium break-all">
                      {item?.leadID?.customerDetail?.fullName}
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col gap-y-1 min-w-[130px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p
                    className={`${
                      item?.appointmentStatus === "Pending"
                        ? "bg-[#4A13E7]"
                        : item?.appointmentStatus === "Completed"
                        ? "bg-[#45C769]"
                        : "bg-[#D80027]"
                    } rounded-lg h-[30px] flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-medium">
                      {item?.appointmentStatus}
                    </span>
                  </p>

                  {item?.isReportSubmitted ? (
                    <OutlineButton
                      inputType="button"
                      onClick={() => handlePreview(item.id)}
                      className="bg-white text-primary w-full border border-primary !h-[30px] text-xs font-medium"
                      text={translate("appointments.view_reports_btn")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  ) : (
                    <Button
                      inputType="button"
                      onClick={() =>
                        handleClickRow(item?.isReportSubmitted, item.id)
                      }
                      className="!h-[30px] text-xs font-medium text-white flex items-center bg-primary rounded-lg"
                      text={translate("appointments.sub_report")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-y-1">
                {item?.createdBy?.company?.companyName && (
                  <div className="flex items-center gap-x-[14px]">
                    <CompanyIcon />
                    <p className="text-[#616161] font-normal text-sm">
                      {item?.createdBy?.company?.companyName}
                    </p>
                  </div>
                )}
                <div className="flex justify-between gap-x-14 truncate">
                  <div className="flex items-center gap-x-[14px]">
                    <DateIcon />
                    <p className="text-[#616161] font-normal text-sm">
                      {viewConvertUTCToLocalDate(item?.startTime)}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-[14px]">
                    <LocationFilledIcon />
                    <p className="text-[#616161] font-normal text-sm truncate">
                      {item?.canton}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
