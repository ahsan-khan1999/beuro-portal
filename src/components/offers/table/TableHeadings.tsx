import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_200px)_minmax(300px,_100%)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(70px,_70px),minmax(100px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(70px,_70px)_minmax(80px,_80px)_minmax(80px,_80px)] xlg:grid-cols-[minmax(70px,_70px),minmax(110px,_100%)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(85px,_85px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(80px,_80px)] maxSize:grid-cols-[minmax(80px,_80px),minmax(110px,_100%)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(80px,_80px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(110px,_110px)_minmax(130px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(80px,_80px)] bg-white rounded-md px-6 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]">
        {translate("offers.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("offers.table_headings.customer")}
      </span>
      <span className="xs:flex mlg:hidden xlg:hidden maxSize:hidden xMaxSize:flex font-medium text-[#8F8F8F]">
        {translate("offers.table_headings.title")}
      </span>
      <span className="font-medium text-[#8F8F8F]">
        {translate("offers.table_headings.total_price")}
      </span>
      <span className="font-medium text-[#8F8F8F] mlg:hidden xlg:hidden maxSize:block">
        {translate("offers.table_headings.created_on")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.email")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.payment")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.images")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.note")}
      </span>
      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("offers.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeadings;
