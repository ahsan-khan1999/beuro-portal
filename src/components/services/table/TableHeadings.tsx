import React from "react";
import { useTranslation } from "next-i18next";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-4 rounded-l-lg gap-x-4 xlg:gap-x-2 maxSize:gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_4fr)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(300px,300px)] mlg:grid-cols-[minmax(70px,_70px),minmax(130px,_130px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(100px,_100%)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_4fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(150px,_3fr)]">
          <span className="font-semibold text-base text-white">
            {translate("services.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("services.table_headings.service")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("services.table_headings.created_on")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("services.table_headings.price")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("services.table_headings.unit")}
          </span>
          <span className="font-semibold text-base text-white break-all">
            {translate("services.table_headings.description")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(90px,_90px)] bg-primary py-4 rounded-r-md pr-1">
        <span className="font-semibold text-base text-white flex justify-center items-center">
          {translate("services.table_headings.edit")}
        </span>
      </div>
    </div>
  );
};

export default TableHeadings;
