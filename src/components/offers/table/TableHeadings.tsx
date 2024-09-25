import React from "react";
import { useTranslation } from "next-i18next";

const TableHeadings = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary rounded-l-lg pl-4 pr-1 py-4 gap-x-4 mlg:gap-x-1 xMaxSize:gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(400px,_3fr)_minmax(300px,_4fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(160px,_160px)] mlg:grid-cols-[minmax(70px,_70px),minmax(100px,_3fr)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(140px,_140px)] xlg:grid-cols-[minmax(70px,_70px),minmax(100px,_100%)_minmax(110px,_110px)_minmax(85px,_85px)_minmax(140px,_140px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(100px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(140px,_140px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(140px,_140px)] xLarge:grid-cols-[minmax(60px,_60px)_minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(140px,_140px)]">
          <span className="font-semibold text-base text-white">
            {translate("offers.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("offers.table_headings.customer")}
          </span>
          <span className="xs:flex mlg:hidden xLarge:flex font-semibold text-base text-white">
            {translate("offers.table_headings.title")}
          </span>
          <span className="font-semibold text-base text-white block mlg:hidden xMaxSize:block">
            {translate("offers.table_headings.total_price")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("offers.table_headings.created_on")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("offers.table_headings.email")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("offers.table_headings.payment")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("offers.table_headings.status")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] bg-primary rounded-r-md py-4">
        <span className="font-semibold text-base text-white flex justify-center items-center">
          {translate("common.actions")}
        </span>
        {/* <span className="font-semibold text-base text-white flex justify-center items-center">
        {translate("offers.table_headings.note")}
      </span>
      <span className="font-semibold text-base text-white flex justify-center items-center">
        {translate("common.mail")}
      </span>
      <span className="font-semibold text-base text-white flex justify-center items-center">
        {translate("offers.table_headings.edit")}
      </span> */}
      </div>
    </div>
  );
};

export default TableHeadings;
