import { CompanyIcon } from "@/assets/svgs/components/company-icon";
import { DateIcon } from "@/assets/svgs/components/date-icon";
import { MailIcon } from "@/assets/svgs/components/mail-icon";
import { UserIcon } from "@/assets/svgs/components/use-icon";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import { Appointments } from "@/types/appointments";
import { Lead } from "@/types/leads";
import { formatDateTimeToDate } from "@/utils/utility";
import { useRouter } from "next/router";

export interface LeadMobileRecordsProps {
  dataToAdd: Lead[];
}

export const LeadTableRecordCard = ({ dataToAdd }: LeadMobileRecordsProps) => {
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

        return (
          <div
            className="pl-5 pb-5 pt-[14px] pr-[14px] bg-white rounded-lg"
            key={index}
          >
            <div className="flex flex-col gap-y-1">
              <div className="flex items-start justify-between gap-x-3">
                <div className="flex items-start gap-x-2">
                  <UserIcon />
                  <div className="flex flex-col gap-y-1">
                    <p className="p-1 rounded-[4px] text-[10px] font-medium text-white text-center bg-primary w-fit min-w-[40px]">
                      {item?.refID}
                    </p>

                    <h2 className="text-[#4A4543] text-base font-medium break-all">
                      {item?.customerDetail?.fullName}
                    </h2>
                  </div>
                </div>

                <p
                  className={`${
                    item?.leadStatus === "InProcess"
                      ? "text-dark"
                      : "text-white"
                  } text-sm font-medium text-center ${
                    item?.leadStatus === "Open"
                      ? "bg-[#4A13E7]"
                      : item?.leadStatus === "InProcess"
                      ? "bg-[#f5d60f]"
                      : item?.leadStatus === "Close"
                      ? "bg-[#45C769]"
                      : "bg-[#FF0000]"
                  } w-[100px] rounded-lg p-1 text-center text-white text-xs`}
                >
                  {item?.leadStatus}
                </p>
              </div>

              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-4">
                  <MailIcon />
                  <p className="text-[#616161] font-normal text-sm break-all">
                    {item?.customerDetail?.email}
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
