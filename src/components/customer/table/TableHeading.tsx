import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary pl-4 pr-1 py-4 rounded-l-lg items-center grid gap-x-4 xs:w-fit xlg:w-auto mlg:w-full xs:grid-cols-[minmax(80px,_80px),minmax(480px,_4fr)_minmax(300px,_3fr)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(60px,_60px)_minmax(90px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_4fr)_minmax(200px,_3fr)_minmax(140px,140px)_minmax(130px,_130px)_minmax(110px,_110px)_minmax(140px,_140px)]">
          <span className="font-semibold text-white text-base">
            {translate("customers.table_headings.id")}
          </span>
          <span className="font-semibold text-white text-base">
            {translate("customers.table_headings.name")}
          </span>
          <span className="font-semibold text-white text-base">
            {translate("customers.table_headings.email")}
          </span>
          <span className="font-semibold text-white text-base">
            {translate("customers.table_headings.phone")}
          </span>
          <span className="font-semibold text-white text-base mlg:hidden maxSize:block">
            {translate("customers.table_headings.created_on")}
          </span>

          <span className="font-semibold text-white text-base">
            {translate("customers.table_headings.location")}
          </span>
          <span className="font-semibold text-white text-base">
            {translate("customers.table_headings.type")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(90px,_90px)] pr-1 py-4 bg-primary rounded-r-md">
        <span className="font-semibold text-base text-white flex items-center justify-center">
          {translate("customers.table_headings.edit")}
        </span>
      </div>
    </div>
  );
};

export default TableHeading;
