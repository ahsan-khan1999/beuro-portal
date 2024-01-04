import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_200px)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(200px,_100%)_minmax(90px,_90px)] mlg:grid-cols-[minmax(70px,_70px),minmax(150px,_150px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(150px,_100%)_minmax(80px,_80px)] xlg:grid-cols-[minmax(80px,_80px),minmax(200px,_100%)_minmax(200px,_200px)_minmax(140px,_140px)_minmax(180px,_100%)_minmax(80px,_80px)] bg-white rounded-md px-6 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("services.table_headings.service")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.created_on")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.price")}
      </span>
      <span className="font-medium text-[#8F8F8F] break-all">
        {translate("services.table_headings.description")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("services.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
