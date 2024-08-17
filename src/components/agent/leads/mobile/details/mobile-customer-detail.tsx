import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { Customers } from "@/types/customer";
import { combineClasses } from "@/utils/utility";
import { useTranslation } from "next-i18next";

export interface MobileCustomerDetailProps {
  data: Customers;
}
export const LeadMobileCustomerDetail = ({
  data,
}: MobileCustomerDetailProps) => {
  const { t: translate } = useTranslation();
  const defaultClasses = combineClasses("p-4 bg-white rounded-b-lg");

  const customerDetail = [
    {
      label: `${translate("leads.customer_details.customer_type")}`,
      value: data.customerType,
    },
    {
      label: `${translate("leads.customer_details.full_name")}`,
      value: data.fullName,
    },
    {
      label: `${translate("login_detail.company_details.company_name")}`,
      value: data.companyName,
    },
    {
      label: `${translate("leads.customer_details.email_address")}`,
      value: data.email,
    },
    {
      label: `${translate("leads.customer_details.phone_number")}`,
      value: data.phoneNumber,
    },
    {
      label: `${translate("leads.customer_details.mobile_number")}`,
      value: data.mobileNumber,
    },
    {
      label: `${translate("customers.details.gender")}`,
      value: data.gender,
    },
  ];

  return (
    <div className={defaultClasses}>
      {data ? (
        <>
          {customerDetail.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-[14px]"
            >
              <span className="text-[#656565] text-xs font-medium">
                {detail.label}:
              </span>
              <span className="text-sm text-[#4A4543] font-medium">
                {detail.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between mb-[14px]">
            <span className="text-[#656565] text-xs font-medium">
              {translate("leads.customer_details.address")}:
            </span>
            <p className="flex flex-col gap-y-[2px]">
              <span className="text-sm text-[#4A4543] font-medium">
                {data?.address?.streetNumber}
              </span>
              <span className="text-sm text-[#4A4543] font-medium">
                {data?.address?.postalCode}
                {data?.address?.country}
              </span>
            </p>
          </div>
        </>
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
