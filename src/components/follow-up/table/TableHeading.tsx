import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="px-5 grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(250px,_250px)_minmax(300px,_300px)_minmax(150px,_150px)_minmax(80px,_100%)_minmax(100px,_100px)] rounded-md ">
      <span className="py-4 font-medium text-[#8F8F8F]">
        {translate("follow_up.all_follow_ups.table_headings.id")}
      </span>
      <span className="py-4 font-medium text-[#8F8F8F] ">
        {translate("follow_up.all_follow_ups.table_headings.customer_name")}
      </span>
      <span className="py-4 font-medium text-[#8F8F8F]">
        {translate("follow_up.all_follow_ups.table_headings.follow_up_date")}
      </span>
      <span className="py-4 font-medium text-[#8F8F8F]">
        {translate("follow_up.all_follow_ups.table_headings.title")}
      </span>
      <span className="py-4 font-medium text-[#8F8F8F] flex justify-center">
        {translate("follow_up.all_follow_ups.table_headings.status")}
      </span>
      <span className="py-4 font-medium text-[#8F8F8F]">
        {translate("follow_up.all_follow_ups.table_headings.delete")}
      </span>

      <span className="py-4 font-medium text-[#8F8F8F]">
        {translate("follow_up.all_follow_ups.table_headings.details")}
      </span>
    </div>
  );
};

export default TableHeading;
