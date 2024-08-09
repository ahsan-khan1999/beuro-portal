import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div className="bg-primary rounded-l-lg gap-x-3 pl-4 pr-1 grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(250px,_250px)_minmax(150px,_100%)_minmax(100px,_100px)]">
          <span className="py-4 font-medium text-white">
            {translate("follow_up.all_follow_ups.table_headings.id")}
          </span>
          <span className="py-4 font-medium text-white">
            {translate("follow_up.all_follow_ups.table_headings.customer_name")}
          </span>
          <span className="py-4 font-medium text-white">
            {translate(
              "follow_up.all_follow_ups.table_headings.follow_up_date"
            )}
          </span>
          <span className="py-4 font-medium text-white">
            {translate("follow_up.all_follow_ups.table_headings.title")}
          </span>
          <span className="py-4 font-medium text-white">
            {translate("follow_up.all_follow_ups.table_headings.status")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px),minmax(50px,_50px)] bg-primary rounded-r-md py-4">
        <span className="font-semibold text-base text-white flex items-center justify-center pl-5">
          {translate("common.actions")}
        </span>
        {/* <span className="py-4 font-medium text-white flex items-center justify-center">
        {translate("follow_up.all_follow_ups.table_headings.delete")}
      </span>

      <span className="py-4 font-medium text-white flex items-center justify-center">
        {translate("follow_up.all_follow_ups.table_headings.details")}
      </span> */}
      </div>
    </div>
  );
};

export default TableHeading;
