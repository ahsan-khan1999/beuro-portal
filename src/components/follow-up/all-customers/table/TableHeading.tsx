import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(200px,_200px)_minmax(180px,_180px)_minmax(170px,_170px)_minmax(160px,_160px)_minmax(160px,_160px)] bg-white rounded-md ">
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white  rounded-md">
        {translate("follow_up.all_customer_details.table_headings.id")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
      {translate("follow_up.all_customer_details.table_headings.name")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
      {translate("follow_up.all_customer_details.table_headings.email")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white">
      {translate("follow_up.all_customer_details.table_headings.phone")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white flex ">
      {translate("follow_up.all_customer_details.table_headings.created_on")}
      </span>
      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
      {translate("follow_up.all_customer_details.table_headings.location")}
      </span>

      <span className="px-5 py-[18px] font-medium text-[#8F8F8F] bg-white ">
      {translate("follow_up.all_customer_details.table_headings.type")}
      </span>
    </div>
  );
};

export default TableHeading;
