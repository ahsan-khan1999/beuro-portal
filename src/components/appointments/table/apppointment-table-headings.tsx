import { useTranslation } from "next-i18next";
import React from "react";

export const AppointmentTableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div
          className={`items-center gap-x-4 bg-primary rounded-l-lg pl-4 pr-1 py-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px)_minmax(80px,_80px)_minmax(200px,3fr)_minmax(150px,_150px)_minmax(150px,150px)_minmax(250px,_3fr)_minmax(180px,_180px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(100px,_100%)_minmax(170px,_170px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(170px,_170px)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(80px,_3fr)_minmax(100px,_4fr)_minmax(170px,_170px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100%)_minmax(170px,_170px)_minmax(130px,_130px)] xLarge:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(70px,_3fr)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(60px,_4fr)_minmax(170px,_170px)_minmax(130px,_130px)]`}
        >
          <span className="font-semibold text-base text-white">
            {translate("appointments.table_headings.id")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("appointments.table_headings.lead_id")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xlg:block">
            {translate("appointments.table_headings.customer")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("appointments.table_headings.date")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
            {translate("appointments.table_headings.time")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("appointments.table_headings.agent")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("appointments.table_headings.status")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("appointments.table_headings.offer_status")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(140px,_140px)] xLarge:grid-cols-[minmax(40px,_40px)_minmax(40px,_40px)_minmax(140px,_140px)] bg-primary rounded-r-md py-4 gap-x-2">
        <span className="font-semibold text-base text-white">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );
};
