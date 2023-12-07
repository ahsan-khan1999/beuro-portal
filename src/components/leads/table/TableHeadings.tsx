import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit  xlg:w-auto  mlg:w-full  xs:grid-cols-[minmax(70px,_70px),minmax(200px,_200px)_minmax(250px,_100%)_minmax(170px,_170px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(120px,_120px)_minmax(160px,_100%)_minmax(130px,_130px)_minmax(65px,_65px)_minmax(45px,_45px)_minmax(50px,_50px)_minmax(30px,_30px)] grid xlg:grid-cols-[minmax(40px,_70px),minmax(130px,_130px)_minmax(160px,_160px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(60px,_60px)_minmax(70px,_70px)_minmax(40px,_40px)] maxSize:grid-cols-[minmax(40px,_70px),minmax(130px,_100%)_minmax(160px,_100%)_minmax(150px,_100%)_minmax(100px,_100px)_minmax(60px,_60px)_minmax(70px,_70px)_minmax(40px,_40px)] bg-white rounded-md gap-x-4  px-6 pt-[23px] pb-[17px]">
      <span className=" font-medium text-[#8F8F8F] rounded-md">
        {translate("leads.table_headings.id")}
      </span>
      <span className=" font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.name")}
      </span>
      <span className=" font-medium text-[#8F8F8F">
        {translate("leads.table_headings.email")}
      </span>
      <span className=" font-medium text-[#8F8F8F">
        {translate("leads.table_headings.phone")}
      </span>

      <span className=" font-medium text-[#8F8F8F]">
        {translate("leads.table_headings.status")}
      </span>
      <span className=" font-medium text-[#8F8F8F flex items-center justify-center">
        {translate("leads.table_headings.images")}
      </span>
      <span className=" font-medium text-[#8F8F8F flex items-center justify-center">
        {translate("leads.table_headings.note")}
      </span>
      <span className=" font-medium text-[#8F8F8F rounded-md"></span>
    </div>
  );
};

export default TableHeadings;
