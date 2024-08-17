import { Customers } from "@/types/customer";
import { combineClasses } from "@/utils/utility";
import { useTranslation } from "next-i18next";
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

export const LeadMobileServiceDetail = ({ services }: { services: any }) => {
  const { t: translate } = useTranslation();
  const defaultClasses = combineClasses("p-4 bg-white rounded-b-lg");

  return (
    <div
      className={defaultClasses}
      id={translate("leads.tabs_headings.customer")}
    >
      {services.map((detail: any, index: any) => (
        <ServiceDetailItem
          key={index}
          label={detail.label}
          value={detail.value}
        />
      ))}
    </div>
  );
};
