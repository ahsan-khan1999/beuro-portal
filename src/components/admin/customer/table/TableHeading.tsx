import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary rounded-l-lg pl-4 gap-x-4 py-4 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(300px,_4fr)_minmax(120px,_120px)] mlg:grid-cols-[minmax(50px,_50px),minmax(80px,_80px)_minmax(150px,2fr)_minmax(100px,_3fr)_minmax(100px,_100px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(100px,_4fr)_minmax(100px,_100px)]">
          <span className="font-medium text-white">
            {translate("admin.customers_details.table_headings.id")}
          </span>
          <span className="font-medium text-white flex items-center justify-center">
            {translate("admin.customers_details.table_headings.logo")}
          </span>
          <span className="font-medium text-white mlg:hidden maxSize:block">
            {translate("admin.customers_details.table_headings.company_name")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.customers_details.table_headings.customer_name")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.customers_details.table_headings.email")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.customers_details.table_headings.plans")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(130px,_130px)_minmax(50px,_50px)] bg-primary rounded-r-lg py-4 pl-1 gap-x-4">
        <span className="font-semibold text-base text-white pl-3">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );
};

export default TableHeading;
