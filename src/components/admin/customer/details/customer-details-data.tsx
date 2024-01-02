import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { CustomersAdmin } from "@/types/admin/customer";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import React from "react";

const CustomerDetailsData = ({
  customerDetail,
}: {
  customerDetail: CustomersAdmin;
}) => {
  const { t: translate } = useTranslation();
  return (
    <LeadsCardLayout>
      <div className="mt-5">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.customers_details.customer_details.owner_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.fullName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate(
                "admin.customers_details.customer_details.company_name"
              )}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.company?.companyName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate(
                "admin.customers_details.customer_details.email_address"
              )}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.customers_details.customer_details.created_on")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {formatDateTimeToDate(customerDetail?.createdAt)}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate(
                "admin.customers_details.customer_details.mobile_number"
              )}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.company?.mobileNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate(
                "admin.customers_details.customer_details.phone_number"
              )}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.company?.phoneNumber}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">
            {translate("admin.customers_details.customer_details.sub_heading")}
          </h4>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate(
                  "admin.customers_details.customer_details.street_no"
                )}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {customerDetail?.company?.address?.streetNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate(
                  "admin.customers_details.customer_details.post_code"
                )}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {customerDetail?.company?.address?.postalCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("admin.customers_details.customer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {customerDetail?.company?.address?.city}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default CustomerDetailsData;
