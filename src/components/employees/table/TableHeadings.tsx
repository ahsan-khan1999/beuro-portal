import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(250px,_250px)_minmax(250px,_100%)_minmax(160px,_160px)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(80px,_80px),minmax(150px,_150px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(80px,_80px)] xlg:grid-cols-[minmax(80px,_80px),minmax(200px,_4fr)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(140px,_140px)_minmax(80px,_80px)] bg-white rounded-md px-6 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.name")}
      </span>
      <span className="font-medium text-[#8F8F8F] break-all">
        {translate("employees.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.phone")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.designation")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.created_on")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("employees.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
