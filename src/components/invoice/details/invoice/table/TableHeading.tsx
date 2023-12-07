import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(240px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(130px,_130px)_minmax(160px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] bg-white rounded-md px-5 pt-[23px] pb-[17px] ">
      <span className="font-medium text-[#8F8F8F] bg-white  rounded-md">
        {translate("invoice.invoice_table_heading.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] bg-white ">
        {translate("invoice.invoice_table_heading.customer")}
      </span>
      <span className="xs:block mlg:hidden xlg:hidden maxSize:hidden xMaxSize:block font-medium text-[#8F8F8F] bg-white">
        {translate("invoice.invoice_table_heading.title")}
      </span>
      <span className="font-medium text-[#8F8F8F] bg-white">
        {translate("invoice.invoice_table_heading.issue_date")}
      </span>
      <span className="font-medium  text-[#8F8F8F] bg-white">
        {translate("invoice.invoice_table_heading.amount")}
      </span>
      <span className="flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        {translate("invoice.invoice_table_heading.email_status")}
      </span>
      <span className="font-medium text-[#8F8F8F] bg-white ">
        {translate("invoice.invoice_table_heading.payment")}
      </span>

      <span className="flex justify-center items-center font-medium text-[#8F8F8F] bg-white ">
        {translate("invoice.invoice_table_heading.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] bg-white rounded-md"></span>
    </div>
  );
};

export default TableHeading;
