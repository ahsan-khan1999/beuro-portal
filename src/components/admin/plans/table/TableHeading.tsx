import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="bg-white xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(400px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(180px,_100%)_minmax(70px,_70px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(60px,_60px),minmax(100px,_100px)_minmax(200px,_100%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(50px,_50px)]  rounded-md px-5 pt-[23px] pb-[17px] ">
      <span className=" font-medium text-[#8F8F8F]">
        {translate("admin.plans_management.id")}
      </span>
      <span className=" font-medium text-[#8F8F8F]">
        {translate("admin.plans_management.plan_name")}
      </span>
      <span className=" font-medium text-[#8F8F8F]">
        {translate("admin.plans_management.description")}
      </span>
      <span className=" font-medium text-[#8F8F8F]">
        {translate("admin.plans_management.price")}
      </span>
      <span className=" font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("admin.plans_management.employees")}
      </span>
      <span className=" font-medium text-[#8F8F8F] flex justify-center items-center">
        {translate("admin.plans_management.delete")}
      </span>
      <span className=" font-medium text-[#8F8F8F] flex justify-center items-center"></span>
    </div>
  );
};

export default TableHeading;
