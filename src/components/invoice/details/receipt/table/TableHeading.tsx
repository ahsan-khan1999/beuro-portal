import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-4 rounded-l-lg gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(200px,_4fr)_minmax(200px,_3fr)_minmax(160px,_160px)_minmax(130px,_130px)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)] xlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(120px,_120px)] xLarge:grid-cols-[minmax(90px,_90px),minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(120px,_120px)]">
          <span className="font-semibold text-base text-white">
            {translate("invoice.receipt_table_heading.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.receipt_table_heading.customer")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("invoice.receipt_table_heading.title")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
            {translate("invoice.receipt_table_heading.paid_date")}
          </span>
          <span className="font-semibold text-base text-white block mlg:hidden xlg:block">
            {translate("invoice.receipt_table_heading.amount")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.receipt_table_heading.email_status")}
          </span>

          <span className="font-semibold text-base text-white">
            {translate("invoice.receipt_table_heading.payment")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.receipt_table_heading.invoice")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px),_minmax(50px,_50px)] bg-primary py-4 rounded-r-md">
        <span className="font-semibold text-base text-white flex justify-center items-center">
          {translate("common.actions")}
        </span>

        {/* <span className="font-semibold text-base text-white"></span> */}
      </div>
    </div>
  );
};

export default TableHeading;
