import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(300px,_3fr)_minmax(350px,_4fr)] mlg:grid-cols-[minmax(70px,_70px),minmax(250px,_250px)_minmax(100px,_100%)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_3fr)_minmax(180px,_4fr)] pt-2 pb-5">
          <span className="font-medium text-[#8F8F8F]">
            {translate("content.table_headings.id")}
          </span>
          <span className="font-medium text-[#8F8F8F]">
            {translate("content.table_headings.name")}
          </span>
          <span className="font-medium text-[#8F8F8F]">
            {translate("content.table_headings.title")}
          </span>

          {/* <span className="font-medium text-[#8F8F8F]">
            {translate("content.table_headings.created_on")}
          </span> */}
        </div>
      </div>
      <div className="grid grid-cols-[minmax(90px,_90px)] pt-2 pb-5">
        <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
          {translate("content.table_headings.edit")}
        </span>
      </div>
    </div>
  );
};

export default TableHeadings;
