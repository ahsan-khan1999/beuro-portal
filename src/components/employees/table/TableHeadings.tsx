import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto  mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(250px,_100%)_minmax(160px,_160px)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(60px,_60px)] mlg:grid-cols-[minmax(80px,_80px),minmax(120px,_120px)_minmax(160px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_150px)_minmax(170px,_100%)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)]  bg-white rounded-md px-5 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]  rounded-md">
        {translate("employees.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("employees.table_headings.name")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("employees.table_headings.phone")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("employees.table_headings.designation")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("employees.table_headings.created_on")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center items-center rounded-md">
        {translate("employees.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
