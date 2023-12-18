import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="grid xs:w-fit xlg:w-auto mlg:w-full xs:grid-cols-[minmax(50px,_50px),minmax(150px,_150px)_minmax(300px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(150px,_100%)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(190px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(40px,_40px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(110px,_110px)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(40px,_40px)] xMaxSize:grid-cols-[minmax(50px,_50px),minmax(150px,_150px)_minmax(180px,_100%)_minmax(140px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(40px,_40px)] bg-white rounded-md gap-x-4  px-6 pt-[23px] pb-[17px]">
      <span className=" font-medium text-[#8F8F8F] rounded-md">
        {translate("customers.table_headings.id")}
      </span>
      <span className="flex items-start justify-start font-medium text-[#8F8F8F] ">
        {translate("customers.table_headings.name")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("customers.table_headings.phone")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xlg:block">
        {translate("customers.table_headings.created_on")}
      </span>

      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.location")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("customers.table_headings.type")}
      </span>

      <span className="font-medium text-[#8F8F8F]  flex justify-center items-center">
        {translate("customers.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeading;
