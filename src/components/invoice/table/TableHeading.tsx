import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(90px,_90px)_minmax(200px,_200px)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(90px,_90px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(110px,_110px)_minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(80px,_80px),minmax(100px,_100%)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] bg-white rounded-md px-5 pt-[23px] pb-[17px] ">
      <span className="font-medium text-[#8F8F8F] rounded-md">
        {translate("invoice.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xlg:block ">
        {translate("invoice.table_headings.customer")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.table_headings.title")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("invoice.table_headings.price")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("invoice.table_headings.email_status")}
      </span>
      <span className="flex justify-center items-center font-medium text-[#8F8F8F]  ">
        {translate("invoice.table_headings.paid")}
      </span>
      <span className="flex justify-center items-center font-medium text-[#8F8F8F]  ">
        {translate("invoice.table_headings.status")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("invoice.table_headings.notes")}
      </span>
      <span className="font-medium text-[#8F8F8F] rounded-md"></span>
    </div>
  );
};

export default TableHeading;
