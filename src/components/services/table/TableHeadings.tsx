import React from "react";
import { useTranslation } from "next-i18next";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="gap-x-4 xlg:gap-x-2 maxSize:gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_4fr)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(300px,300px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(70px,_70px),minmax(130px,_130px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_4fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(150px,_3fr)_minmax(90px,_90px)] bg-white pt-2 pb-5">
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.service")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.created_on")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.price")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("services.table_headings.unit")}
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
