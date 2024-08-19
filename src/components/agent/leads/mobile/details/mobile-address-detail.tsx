import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { CustomerAddress } from "@/types/leads";
import { combineClasses } from "@/utils/utility";

export const LeadsAddressMobileDetails = ({
  address,
}: {
  address: CustomerAddress[];
}) => {
  const defaultClasses = combineClasses("p-4 bg-white rounded-b-lg");

  const isEmptyAddress = (addr: CustomerAddress) => {
    return (
      !addr.streetNumber?.trim() &&
      !addr.postalCode?.trim() &&
      !addr.country?.trim() &&
      !addr.description?.trim()
    );
  };

  const nonEmptyAddresses = address?.filter((addr) => !isEmptyAddress(addr));

  return (
    <div className={defaultClasses}>
      {nonEmptyAddresses?.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          {nonEmptyAddresses?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-y-3 ${
                index < address?.length - 1
                  ? "border-b border-b-[#000] border-opacity-20 pb-4"
                  : ""
              }`}
            >
              {item?.label && (
                <span className="text-[#656565] text-xs font-medium">
                  {item?.label}:
                </span>
              )}
              <p className="flex flex-col gap-y-[2px]">
                <span className="text-sm text-[#4A4543] font-medium">
                  {item?.streetNumber}
                </span>
                <span className="text-sm text-[#4A4543] font-medium">
                  {item?.postalCode}
                  {item?.country}
                </span>
              </p>

              {item.description && (
                <div className="flex flex-col gap-y-1">
                  <p className="text-[#656565] text-xs font-medium">
                    Description:
                  </p>
                  <p className="text-[#4A4543] text-xs font-normal">
                    {item?.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <NoDataEmptyState
          containerClassName="py-5"
          imgClassName="w-14 h-14"
          textClassName="text-lg"
        />
      )}
    </div>
  );
};
