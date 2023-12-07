import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(60px,_60px),minmax(200px,_100%)_minmax(170px,_100%)_minmax(150px,_150px)_minmax(120px,_100%)_minmax(120px,_120px)_minmax(150px,_150px)_minmax(100px,_100px)] mlg:grid-cols-[minmax(60px,_60px),minmax(130px,_100%)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(90px,_90px)] xlg:grid-cols-[minmax(60px,_60px),minmax(140px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(90px,_90px)] maxSize:grid-cols-[minmax(60px,_60px),minmax(150px,_100%)_minmax(170px,_170px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(90px,_90px)] xMaxSize:grid-cols-[minmax(60px,_60px),minmax(160px,_100%)_minmax(140px,_100%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(90px,_90px)]  rounded-md px-5 pt-[23px] pb-[17px] bg-white">
      <span className="font-medium text-[#8F8F8F]   rounded-md">
        {translate("admin.payment_history.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]  xs:block mlg:hidden xlg:block maxSize:block">
        {translate("admin.payment_history.table_headings.company_name")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("admin.payment_history.table_headings.owner_name")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("admin.payment_history.table_headings.plans")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("admin.payment_history.table_headings.pricing")}
      </span>
      <span className="font-medium text-[#8F8F8F]  ">
        {translate("admin.payment_history.table_headings.payments")}
      </span>
      <span className="font-medium text-[#8F8F8F]  ">
        {translate("admin.payment_history.table_headings.subscribed_at")}
      </span>
      <span className="font-medium text-[#8F8F8F]  ">
        {translate("admin.payment_history.table_headings.status")}
      </span>
    </div>
  );
};

export default TableHeading;
