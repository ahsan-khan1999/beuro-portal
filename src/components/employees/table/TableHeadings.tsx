import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-1 rounded-l-md gap-x-4 xlg:gap-x-2 maxSize:gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(250px,_250px)_minmax(250px,_100%)_minmax(160px,_160px)_minmax(150px,_150px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(50px,_50px),minmax(100px,_3fr)_minmax(90px,_4fr)] xlg:grid-cols-[minmax(60px,_60px),minmax(250px,_250px)_minmax(100px,_100%)_minmax(120px,_120px)] maxSize:grid-cols-[minmax(60px,_60px),minmax(140px,_4fr)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(120px,_120px)] xMaxSize:grid-cols-[minmax(60px,_60px),minmax(150px,_4fr)_minmax(100px,_3fr)_minmax(140px,_140px)_minmax(130px,_130px)_minmax(120px,_120px)]">
          <span className="font-semibold text-base text-white">
            {translate("employees.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("employees.table_headings.name")}
          </span>
          <span className="font-semibold text-base text-white break-all">
            {translate("employees.table_headings.email")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden maxSize:block">
            {translate("employees.table_headings.phone")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden maxSize:block">
            {translate("employees.table_headings.designation")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xlg:block">
            {translate("employees.table_headings.created_on")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(90px,_90px)] bg-primary py-4 rounded-r-md pr-1">
        <span className="font-semibold text-base text-white flex justify-center">
          {translate("employees.table_headings.edit")}
        </span>
      </div>
    </div>
  );
};

export default TableHeadings;
