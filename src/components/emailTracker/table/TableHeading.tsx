import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(300px,_100%)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(130px,_130px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(80px,_80px),minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(80px,_80px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(80px,_80px)] maxSize:grid-cols-[minmax(90px,_90px),minmax(130px,_100%)_minmax(160px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(80px,_80px)] bg-white rounded-md px-6 pt-[23px] pb-[17px]">
      <span className="font-medium text-[#8F8F8F]">
        {translate("email_tracker.table_headings.id")}
      </span>
      <span className="font-medium text-[#8F8F8F]  ">
        {translate("email_tracker.table_headings.recipient")}
      </span>
      <span className="xs:block mlg:hidden xlg:hidden maxSize:block font-medium text-[#8F8F8F]">
        {translate("email_tracker.table_headings.subject")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("email_tracker.table_headings.send_at")}
      </span>
      <span className="font-medium text-[#8F8F8F] ">
        {translate("email_tracker.table_headings.viewed_at")}
      </span>
      <span className="font-medium text-[#8F8F8F] text-center">
        {translate("email_tracker.table_headings.status")}
      </span>
      <span className="font-medium text-[#8F8F8F] text-center">
        {translate("email_tracker.table_headings.view_mail")}
      </span>

      <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("email_tracker.table_headings.edit")}
      </span>
    </div>
  );
};

export default TableHeading;
