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
}

const AddressDetails: React.FC<ReportAddressDetailsProps> = ({
  address = [],
}) => {
  let maxLength = 0;
  for (const item of address) {
    const labelLength = item?.label?.length || 0;
    if (labelLength > maxLength) maxLength = labelLength;
  }

  const labelWidth = maxLength < 15 ? 15 * 6 : maxLength * 6; // Calculate dynamic width
  const valueWidth = 595 - labelWidth; // Remaining width for value

  return (
    <div className="py-5">
      <div className="flex flex-col space-y-3">
        {address.map((item, index) => (
          <div key={index} className="flex">
            <div
              className="text-xs font-medium text-black"
              style={{ width: `${labelWidth}px` }}
            >
              {item.label}:
            </div>

            <div
              className="text-xs font-normal text-black pr-8"
              style={{ width: `${valueWidth}px` }}
            >
              {`${item.streetNumber || ""}, ${item.postalCode || ""}, ${
                Country[item.country || ""] || ""
              }`}
              {item.description && ` - ${item.description}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressDetails;
