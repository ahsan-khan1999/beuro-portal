import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(250px,_4fr)_minmax(300px,_3fr)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(70px,_70px),minmax(90px,_3fr)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(70px,_70px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] xlg:grid-cols-[minmax(70px,_70px),minmax(90px,_3fr)_minmax(110px,_110px)_minmax(80px,_80px)_minmax(85px,_85px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_3fr)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(90px,_4fr)_minmax(120px,_3fr)_minmax(120px,_120px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] xLarge:grid-cols-[minmax(70px,_70px)_minmax(90px,_4fr)_minmax(120px,_3fr)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] bg-white rounded-md px-6 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]">
        {translate("contracts.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("contracts.table_headings.customer")}
      </span>
      <span className="mr-1 xs:flex mlg:hidden xlg:hidden maxSize:flex xMaxSize:flex font-medium text-[#8F8F8F]">
        {translate("contracts.table_headings.title")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xlg:block">
        {translate("contracts.table_headings.total_price")}
      </span>
      <span className="mlg:hidden xLarge:block font-medium text-[#8F8F8F]">
        {translate("contracts.table_headings.created_on")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.email")}
      </span>
      <span className="flex justify-center items-center font-medium text-[#8F8F8F] ">
        {translate("contracts.table_headings.payment")}
      </span>
      <span className="flex justify-center items-center font-medium text-[#8F8F8F] ">
        {translate("contracts.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("contracts.table_headings.images")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("contracts.table_headings.notes")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("common.mail")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex items-center justify-center">
        {translate("contracts.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
