import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { combineClasses } from "@/utils/utility";
import { ServiceMobileDetailProps } from ".";
interface ServiceDetailItemProps {
  label: string;
  value?: string;
}

const ServiceDetailItem: React.FC<ServiceDetailItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between mb-[14px]">
      <span className="text-[#656565] text-xs font-medium">{label}:</span>
      <span className="text-sm text-[#4A4543] font-medium">{value}</span>
    </div>
  );
};

export const LeadMobileServiceDetail = ({
  services,
}: {
  services: ServiceMobileDetailProps[];
}) => {
  const defaultClasses = combineClasses("p-4 bg-white rounded-b-lg");

  const hasData = services?.every(
    (service) => service.value !== undefined && service.value !== ""
  );

  return (
    <div className={defaultClasses}>
      {hasData ? (
        services?.map((detail: any, index: any) => (
          <ServiceDetailItem
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
