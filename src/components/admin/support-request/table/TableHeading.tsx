import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary rounded-l-lg pl-4 gap-x-4 py-4 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(200px,_3fr)_minmax(300px,_4fr)_minmax(180px,_180px)_minmax(160px,_160px)] mlg:grid-cols-[minmax(60px,_60px),minmax(100px,_100%)_minmax(160px,_160px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(60px,_60px),minmax(150px,_3fr)_minmax(150px,_4fr)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(60px,_60px),minmax(150px,_3fr)_minmax(150px,_4fr)_minmax(140px,_140px)_minmax(130px,_130px)]">
          <span className="font-medium text-white">
            {translate("admin.support_requests.table_headings.id")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.support_requests.table_headings.customer_name")}
          </span>
          <span className="font-medium text-white xs:block mlg:hidden xlg:block">
            {translate("admin.support_requests.table_headings.email_address")}
          </span>
          <span className="font-medium text-white xlg:hidden maxSize:block">
            {translate("admin.support_requests.table_headings.phone_number")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.support_requests.table_headings.request_date")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(140px,_140px)_minmax(50px,_50px)] bg-primary rounded-r-lg py-4 gap-x-3">
        <span className="font-semibold text-base text-white">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );
};

export default TableHeading;
