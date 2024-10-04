import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary py-4 pl-4 pr-1 rounded-l-lg gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_3fr)_minmax(300px,_4fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(80px,_80px),minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(100px,_100px),minmax(120px,_3fr)_minmax(140px,_4fr)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(120px,_3fr)_minmax(140px,_4fr)_minmax(120px,_120px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(130px,_3fr)_minmax(160px,_4fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(130px,_130px)]">
          <span className="font-semibold text-base text-white">
            {translate("email_tracker.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("email_tracker.table_headings.recipient")}
          </span>
          <span className="xs:block mlg:hidden xlg:hidden maxSize:block font-semibold text-base text-white mr-1">
            {translate("email_tracker.table_headings.subject")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("email_tracker.table_headings.send_at")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("email_tracker.table_headings.viewed_at")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("email_tracker.table_headings.status")}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[minmax(40px,_40px)_minmax(40px,_40px)] gap-x-1 bg-primary py-4 rounded-r-md">
        <span className="font-semibold text-base text-white">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );
};

export default TableHeading;
