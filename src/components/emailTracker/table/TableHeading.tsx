import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_4fr)_minmax(300px,_3fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)] mlg:grid-cols-[minmax(80px,_80px),minmax(100px,_100%)_minmax(130px,_130px)_minmax(100px,_100px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_4fr)_minmax(130px,_3fr)_minmax(100px,_100px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(140px,_4fr)_minmax(130px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(160px,_4fr)_minmax(130px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)] pt-2 pb-5">
          <span className="font-medium text-[#8F8F8F]">
            {translate("email_tracker.table_headings.id")}
          </span>
          <span className="font-medium text-[#8F8F8F] ">
            {translate("email_tracker.table_headings.recipient")}
          </span>
          <span className="xs:block mlg:hidden xlg:hidden maxSize:block font-medium text-[#8F8F8F] mr-1">
            {translate("email_tracker.table_headings.subject")}
          </span>
          <span className="font-medium text-[#8F8F8F] ">
            {translate("email_tracker.table_headings.send_at")}
          </span>
          <span className="font-medium text-[#8F8F8F] mlg:hidden xMaxSize:block">
            {translate("email_tracker.table_headings.viewed_at")}
          </span>
          <span className="font-medium text-[#8F8F8F]">
            {translate("email_tracker.table_headings.status")}
          </span>
        </div>
      </div>
      <div className="ml-2 grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)] pt-2 pb-5">
        <span className="font-medium text-[#8F8F8F]">
          {translate("common.actions")}
        </span>
        {/* <span className="font-medium text-[#8F8F8F] text-center">
          {translate("email_tracker.table_headings.view_mail")}
        </span>

        <span className="font-medium text-[#8F8F8F] flex justify-center items-center">
          {translate("email_tracker.table_headings.edit")}
        </span> */}
      </div>
    </div>
  );
};

export default TableHeading;
