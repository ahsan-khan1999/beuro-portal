import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="bg-white xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(340px,_100%)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(60px,_60px),minmax(180px,_100%)_minmax(200px,_200px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(60px,_60px),minmax(150px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)]  rounded-md px-5 pt-[23px] pb-[17px] ">
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.support_requests.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.support_requests.table_headings.customer_name")}
      </span>
      <span className="font-medium text-[#8F8F8F] xs:block mlg:hidden xlg:block">
        {translate("admin.support_requests.table_headings.email_address")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.support_requests.table_headings.phone_number")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("admin.support_requests.table_headings.request_date")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("admin.support_requests.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center"></span>
    </div>
  );
};

export default TableHeading;
