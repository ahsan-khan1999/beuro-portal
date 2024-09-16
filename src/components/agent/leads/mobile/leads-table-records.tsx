import { LocationFilledIcon } from "@/assets/svgs/components/location-filled-icon";
import { MailIcon } from "@/assets/svgs/components/mail-icon";
import { UserIcon } from "@/assets/svgs/components/use-icon";
import { Lead } from "@/types/leads";
import { useRouter } from "next/router";

export interface LeadMobileRecordsProps {
  dataToAdd: Lead[];
  isAgent: boolean;
}

export const LeadTableRecordCard = ({
  dataToAdd,
  isAgent,
}: LeadMobileRecordsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-5">
      {dataToAdd.map((item, index) => {
        const handleDetail = () => {
          router.push({
            pathname: isAgent ? "/agent/leads/details" : "/leads/details",
            query: { ...router.query, lead: item?.id },
          });
        };

        return (
          <div
            className="pl-5 pb-5 pt-[14px] pr-[14px] bg-white rounded-lg cursor-pointer"
            key={index}
            onClick={handleDetail}
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
                {item?.customerDetail?.email && (
                  <div className="flex items-center gap-x-4">
                    <MailIcon />
                    <p className="text-[#616161] font-normal text-sm break-all">
                      {item?.customerDetail?.email}
                    </p>
                  </div>
                )}
                {item?.customerDetail?.address?.country && (
                  <div className="flex items-center gap-x-4">
                    <LocationFilledIcon />
                    <p className="text-[#616161] font-normal text-sm break-all">
                      {item?.customerDetail?.address?.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
