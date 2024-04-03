import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(200px,_4fr)_minmax(200px,_3fr)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(120px,_3fr)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] xLarge:grid-cols-[minmax(80px,_80px),minmax(100px,_3fr)_minmax(130px,_4fr)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] xMaxLarge:grid-cols-[minmax(80px,_80px),minmax(100px,_3fr)_minmax(130px,_4fr)_minmax(150px,_150px)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] pt-2 pb-5">
      <span className="font-medium text-[#8F8F8F] ">
        {translate("invoice.invoice_table_heading.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.customer")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xMaxSize:block">
        {translate("invoice.invoice_table_heading.title")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xMaxLarge:block">
        {translate("invoice.invoice_table_heading.issue_date")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden maxSize:block">
        {translate("invoice.invoice_table_heading.amount")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.email_status")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.payment")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("common.actions")}
      </span>
      {/* <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("common.mail")}
      </span>
      <span className="font-medium text-[#8F8F8F]"></span> */}
    </div>
  );
};

export default TableHeading;
