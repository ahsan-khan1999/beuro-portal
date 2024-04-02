import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="grid gap-x-4 xs:w-fit xlg:w-auto mlg:w-full xs:grid-cols-[minmax(80px,_80px),minmax(300px,_4fr)_minmax(300px,_3fr)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(60px,_60px)_minmax(90px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(90px,_90px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(90px,_90px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_4fr)_minmax(200px,_3fr)_minmax(140px,140px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(90px,_90px)] pt-2 pb-5">
      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.id")}
      </span>
      <span className="flex items-start justify-start font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.name")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.phone")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden maxSize:block">
        {translate("customers.table_headings.created_on")}
      </span>

      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.location")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.type")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("customers.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeading;
