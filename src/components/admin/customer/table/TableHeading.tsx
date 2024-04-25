import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(300px,_300px)_minmax(200px,_200px)_minmax(400px,_400px)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(160px,_160px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(180px,_180px)_minmax(180px,_180px)_minmax(120px,_100%)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(40px,_40px)] gap-x-4 pt-2 pb-5">
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.customers_details.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("admin.customers_details.table_headings.logo")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.customers_details.table_headings.company_name")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.customers_details.table_headings.customer_name")}
      </span>
      <span className="font-medium text-[#8F8F8F] xs:block mlg:hidden xlg:block">
        {translate("admin.customers_details.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.customers_details.table_headings.plans")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("admin.customers_details.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F]"></span>
    </div>
  );
};

export default TableHeading;
