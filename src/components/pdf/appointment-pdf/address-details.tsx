import { DateRangeProps } from "@/types";
import { formatDateTimeToDate, germanDateFormat } from "@/utils/utility";
import React from "react";

export const Country: Record<string, string> = {
  Switzerland: "Schweiz",
  Germany: "Deutschland",
  Austria: "Österreich",
  Italy: "Italien",
  France: "Frankreich",
};

interface Address {
  label?: string;
  streetNumber?: string;
  postalCode?: string;
  country?: keyof typeof Country;
  description?: string;
}

interface ReportAddressDetailsProps {
  address?: Address[];
  workDates?: DateRangeProps[];
  isOffer?: boolean;
  time?: string;
}

const AddressDetails: React.FC<ReportAddressDetailsProps> = ({
  address = [],
  workDates,
  time,
}) => {
  let maxLength = 0;
  for (const item of address) {
    const labelLength = item?.label?.length || 0;
    if (labelLength > maxLength) maxLength = labelLength;
  }

  const labelWidth = maxLength < 15 ? 15 * 6 : maxLength * 6; // Calculate dynamic width
  const valueWidth = 595 - labelWidth; // Remaining width for value

  return (
    <div className="pb-5">
      <div className="flex flex-col space-y-3">
        {address.map((item, index) => (
          <div key={index} className="flex">
            <div
              className="text-xs font-medium text-black min-w-[110px]"
              style={{ width: `${labelWidth}px` }}
            >
              {item.label}:
            </div>

            <div className="flex gap-1" style={{ width: `${valueWidth}px` }}>
              {item.streetNumber && (
                <span className="text-xs font-normal text-black ">
                  {item.streetNumber + ","}
                </span>
              )}
              {item.postalCode && (
                <span className="text-xs font-normal text-black ">
                  {item.postalCode + ","}
                </span>
              )}

              {item.country && (
                <span className="text-xs font-normal text-black ">
                  {Country[item.country]}
                </span>
              )}
              {item.description && (
                <span className="text-xs font-normal text-black ">
                  {"- " + item.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {workDates && workDates?.length > 0 && (
        <div className="flex flex-row gap-1">
          <span className="min-w-[105px] mt-2 text-xs font-medium text-black">
            {workDates?.length === 1
              ? translate("pdf.work_date")
              : translate("pdf.work_dates")}
            :
          </span>
          <div className="flex flex-row flex-wrap mt-2 max-w-[850px]">
            <span className="text-xs font-medium text-black">
              {workDates?.map(
                (item, index) =>
                  `${germanDateFormat(item.startDate)}${
                    item.endDate
                      ? ` ${translate("contracts.card_content.to")} ` +
                        germanDateFormat(item.endDate) +
                        ((workDates?.length - 1 != index && ", ") || ".")
                      : (workDates?.length - 1 != index && ", ") || "."
                  }`
              )}
              {time &&
                ` ${translate("common.at")} ` +
                  time +
                  ` ${translate("common.clock")} `}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressDetails;
