import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-4 rounded-l-lg gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(200px,_4fr)_minmax(200px,_3fr)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)] xlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(120px,_3fr)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)] xLarge:grid-cols-[minmax(80px,_80px),minmax(100px,_3fr)_minmax(130px,_4fr)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)] xMaxLarge:grid-cols-[minmax(80px,_80px),minmax(100px,_3fr)_minmax(130px,_4fr)_minmax(150px,_150px)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)]">
          <span className="font-semibold text-base text-white">
            {translate("invoice.invoice_table_heading.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.invoice_table_heading.customer")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("invoice.invoice_table_heading.title")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxLarge:block">
            {translate("invoice.invoice_table_heading.issue_date")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden maxSize:block">
            {translate("invoice.invoice_table_heading.amount")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.invoice_table_heading.email_status")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.invoice_table_heading.payment")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.invoice_table_heading.status")}
          </span>
        </div>
      </div>
      <div className="grid xs:grid-cols-[minmax(100px,_100px),_minmax(50px,_50px),_minmax(50px,_50px),_minmax(50px,_50px)] mlg:grid-cols-[minmax(40px,_40px),_minmax(40px,_40px),_minmax(40px,_40px)] xMaxSize:grid-cols-[minmax(100px,_100px),_minmax(40px,_40px),_minmax(40px,_40px),_minmax(40px,_40px)] bg-primary py-4 rounded-r-md gap-x-1">
        <span className="font-semibold text-base text-white">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );
};

export default TableHeading;
