import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(50px,_50px),minmax(130px,_130px)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(90px,_90px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(40px,_40px)] mlg:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(120px,_100%)_minmax(80px,_100%)_minmax(80px,_80px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(100px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(40px,_40px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(150px,_100%)_minmax(110px,_110%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(40px,_40px)] xMaxSize:grid-cols-[minmax(50px,_50px),minmax(120px,_120px)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(40px,_40px)] bg-white rounded-md gap-x-4 px-6 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.name")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden maxSize:block">
        {translate("leads.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.phone")}
      </span>
      <span className="font-medium text-[#8F8F8F] block mlg:hidden xlg:block maxSize:hidden xMaxSize:block">
        {translate("leads.table_headings.desire_date")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.location")}
      </span>

      <span className="font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("leads.table_headings.images")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("leads.table_headings.note")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("leads.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
