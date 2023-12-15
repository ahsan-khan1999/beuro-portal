import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(250px,_250px)_minmax(300px,_300px)_minmax(150px,_150px)_minmax(80px,_100%)_minmax(100px,_100px)] bg-white rounded-md ">
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white  rounded-md">
        {translate("follow_up.all_follow_ups.table_headings.id")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
      {translate("follow_up.all_follow_ups.table_headings.customer_name")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
      {translate("follow_up.all_follow_ups.table_headings.follow_up_date")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
      {translate("follow_up.all_follow_ups.table_headings.title")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white flex justify-center items-center">
      {translate("follow_up.all_follow_ups.table_headings.status")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
      {translate("follow_up.all_follow_ups.table_headings.delete")}
      </span>

      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
      {translate("follow_up.all_follow_ups.table_headings.details")}
      </span>
    </div>
  );
};

export default TableHeading;
