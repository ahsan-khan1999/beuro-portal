import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit bg-white xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(170px,_4fr)_minmax(200px,_3fr)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(110px,_110px)_minmax(40px,_40px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(80px,_80px)] maxSize:grid-cols-[minmax(80px,_80px)_minmax(70px,_4fr)_minmax(130px,_3fr)_minmax(80px,_80px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(80px,_80px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(120px,_3fr)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(40px,_40px)] xLarge:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(130px,_3fr)_minmax(170px,_170px)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(40px,_40px)] rounded-md px-6 pt-[23px] pb-[17px] ">
      <span className="font-medium text-[#8F8F8F] ">
        {translate("invoice.invoice_table_heading.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.customer")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden maxSize:block mr-1">
        {translate("invoice.invoice_table_heading.title")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xLarge:block">
        {translate("invoice.invoice_table_heading.issue_date")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.amount")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("invoice.invoice_table_heading.email_status")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.invoice_table_heading.payment")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center ">
        {translate("invoice.invoice_table_heading.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("invoice.invoice_table_heading.edit")}
      </span>
      <span className="font-medium text-[#8F8F8F]"></span>
    </div>
  );
};

export default TableHeading;
