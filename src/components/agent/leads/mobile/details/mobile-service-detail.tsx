import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { combineClasses } from "@/utils/utility";
import { ServiceMobileDetailProps } from ".";
import { MobileDetailItem } from "@/base-components/ui/item-mobile-row";

export const LeadMobileServiceDetail = ({
  services,
}: {
  services: ServiceMobileDetailProps[];
}) => {
  const defaultClasses = combineClasses("p-4 bg-white rounded-b-lg");

  const hasData = services?.some(
    (service) => service.value !== undefined && service.value !== ""
  );

  return (
    <div className={defaultClasses}>
      {hasData ? (
        services?.map((detail: any, index: any) => (
          <MobileDetailItem
            key={index}
            label={detail.label}
            value={detail.value}
          />
        ))
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
