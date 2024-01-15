import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(300px,_300px)_minmax(350px,_100%)_minmax(150px,_150px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(80px,_80px),minmax(0px,_250px)_minmax(180px,_100%)_minmax(200px,_200px)_minmax(90px,_90px)] bg-white rounded-md px-6 pt-[23px] pb-[17px] ">
      <span className="font-medium text-[#8F8F8F]">
        {translate("content.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("content.table_headings.name")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("content.table_headings.title")}
      </span>

      <span className="font-medium text-[#8F8F8F]">
        {translate("content.table_headings.created_on")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("content.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
