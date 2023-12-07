import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { CustomersAdmin } from "@/types/admin/customer";
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
              {customerDetail?.customerName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
            {translate("admin.customers_details.customer_details.company_name")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.companyName}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
            {translate("admin.customers_details.customer_details.email_address")}
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
              {customerDetail?.createdOn?.toLocaleDateString()}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
            {translate("admin.customers_details.customer_details.mobile_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.mobileNumber}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
            {translate("admin.customers_details.customer_details.phone_number")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {customerDetail?.phoneNumber}
            </div>
          </div>
        </div>
        
        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">{translate("admin.customers_details.customer_details.sub_heading")}</h4>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.customers_details.customer_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {customerDetail?.addressDetails?.streetNo}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.customers_details.customer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {customerDetail?.addressDetails?.postCode}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("admin.customers_details.customer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {customerDetail?.addressDetails?.country}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default CustomerDetailsData;
