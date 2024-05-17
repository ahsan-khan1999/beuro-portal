import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-1 rounded-l-md gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(90px,_90px)_minmax(400px,_5fr)_minmax(250px,_4fr)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(70px,_70px),minmax(120px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(120px,_120px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(100px,_4fr)_minmax(110px,_3fr)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)] xMaxSize:grid-cols-[minmax(70px,_70px),minmax(100px,_4fr)_minmax(110px,_3fr)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)]">
          <span className="font-semibold text-base text-white">
            {translate("invoice.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.table_headings.customer")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden maxSize:block">
            {translate("invoice.table_headings.title")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden maxSize:block">
            {translate("invoice.table_headings.work_date")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("invoice.table_headings.price")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.table_headings.email_status")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.table_headings.paid")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("invoice.table_headings.status")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)] bg-primary py-4 rounded-r-md">
        <span className="font-semibold text-base text-white flex justify-center items-center">
          {translate("common.actions")}
        </span>
        {/* <span className="font-semibold text-base text-white flex justify-center items-center">
        {translate("invoice.table_headings.edit")}
      </span> */}
      </div>
    </div>
  );
};

export default TableHeading;
