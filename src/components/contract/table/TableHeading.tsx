import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-4 pr-1 rounded-l-lg gap-x-5 mlg:gap-x-1 xMaxSize:gap-x-4 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(400px,_4fr)_minmax(300px,_3fr)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(140px,_140px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(65px,_65px),minmax(90px,_3fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xlg:grid-cols-[minmax(65px,_65px),minmax(110px,_3fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_3fr)_minmax(100px,_100px)_minmax(140px,_140px)_minmax(150px,_150px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_4fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xLarge:grid-cols-[minmax(65px,_65px)_minmax(80px,_3fr)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] maxLarge:grid-cols-[minmax(65px,_65px)_minmax(100px,_3fr)_minmax(80px,_4fr)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)]">
          <span className="font-semibold text-base text-white">
            {translate("contracts.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("contracts.table_headings.customer")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden maxLarge:block">
            {translate("contracts.table_headings.title")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
            {translate("contracts.table_headings.total_price")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
            {/* {translate("contracts.table_headings.created_on")} */}
            {translate("calendar.main_heading")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("offers.table_headings.email")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("contracts.table_headings.payment")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("contracts.table_headings.status")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] bg-primary rounded-r-md py-4">
        <span className="font-semibold text-base text-white flex items-center justify-center ml-4">
          {translate("common.actions")}
        </span>
        {/* <span className="font-semibold text-base text-white flex items-center justify-center">
        {translate("contracts.table_headings.pdf")}
      </span>
      <span className="font-semibold text-base text-white flex items-center justify-center">
        {translate("contracts.table_headings.notes")}
      </span>
      <span className="font-semibold text-base text-white flex items-center justify-center">
        {translate("common.mail")}
      </span>
      <span className="font-semibold text-base text-white flex items-center justify-center">
        {translate("contracts.table_headings.edit")}
      </span> */}
      </div>
    </div>
  );
};

export default TableHeadings;
