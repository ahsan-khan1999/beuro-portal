import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(60px,_60px),minmax(80px,_80px)_minmax(200px,_200px)_minmax(160px,_160px)_minmax(240px,_100%)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(180px,_180px)_minmax(140px,_140px)_minmax(160px,_100%)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(40px,_40px)] bg-white  rounded-md px-5 pt-[23px] pb-[17px] ">
      <span className="font-medium text-[#8F8F8F]   rounded-md">
        {translate("admin.customers_details.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]  flex items-center justify-center">
        {translate("admin.customers_details.table_headings.logo")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("admin.customers_details.table_headings.company_name")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("admin.customers_details.table_headings.customer_name")}
      </span>
      <span className="font-medium text-[#8F8F8F]  xs:block mlg:hidden xlg:hidden maxSize:block">
        {translate("admin.customers_details.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F]  ">
        {translate("admin.customers_details.table_headings.plans")}
      </span>
      <span className="font-medium text-[#8F8F8F]  flex items-center justify-center">
        {translate("admin.customers_details.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F]  rounded-md"></span>
    </div>
  );
};

export default TableHeading;
