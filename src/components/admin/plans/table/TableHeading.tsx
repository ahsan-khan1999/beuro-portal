import { useTranslation } from "next-i18next";
import React from "react";

const TableHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div
          className={`bg-primary rounded-l-lg pl-4 py-4 gap-x-4 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(200px,_200px)_minmax(400px,_4fr)_minmax(100px,_100px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(50px,_50px),minmax(200px,_200px)_minmax(150px,_4fr)_minmax(80px,_80px)_minmax(100px,_100px)] xlg:grid-cols-[minmax(60px,_60px),minmax(200px,_200px)_minmax(200px,_4fr)_minmax(100px,_100px)_minmax(120px,_120px)]`}
        >
          <span className="font-medium text-white">
            {translate("admin.plans_management.id")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.plans_management.plan_name")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.plans_management.description")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.plans_management.price")}
          </span>
          <span className="font-medium text-white">
            {translate("admin.plans_management.employees")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)] bg-primary rounded-r-lg py-4 gap-x-3">
        <span className="font-semibold text-base text-white pl-3">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );
};

export default TableHeading;
