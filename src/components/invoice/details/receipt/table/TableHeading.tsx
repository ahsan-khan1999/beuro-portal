import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(200px,_4fr)_minmax(200px,_3fr)_minmax(160px,_160px)_minmax(130px,_130px)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(70px,_70px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(50px,_50px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(50px,_50px)_minmax(40px,_40px)] maxSize:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(50px,_50px)_minmax(40px,_40px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(50px,_50px)_minmax(40px,_40px)] xLarge:grid-cols-[minmax(90px,_90px),minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(50px,_50px)_minmax(40px,_40px)] pt-2 pb-5">
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.receipt_table_heading.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.receipt_table_heading.customer")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xMaxSize:block">
        {translate("invoice.receipt_table_heading.title")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xLarge:block">
        {translate("invoice.receipt_table_heading.paid_date")}
      </span>
      <span className="font-medium text-[#8F8F8F] block mlg:hidden xlg:block">
        {translate("invoice.receipt_table_heading.amount")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.receipt_table_heading.email_status")}
      </span>

      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.receipt_table_heading.payment")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.receipt_table_heading.invoice")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("common.actions")}
      </span>

      {/* <span className="font-medium text-[#8F8F8F]"></span> */}
    </div>
  );
};

export default TableHeading;
