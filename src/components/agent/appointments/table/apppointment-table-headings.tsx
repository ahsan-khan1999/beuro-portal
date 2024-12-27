import React from "react";
import { useTranslation } from "next-i18next";

export const AppointmentTableHeadings = () => {
  const { t: translate } = useTranslation();

  return (
    <div>
      <div
        className="grid 
      grid-cols-[minmax(100px,15%)_minmax(100px,_15%)_minmax(80px,_12%)_minmax(80px,_23%)_minmax(100px,15%)_minmax(150px,20%)] 
      items-center gap-x-2 bg-primary rounded-lg px-2 py-4"
      >
        <div>
          <span className="font-semibold text-xs md:text-sm xl:text-base text-white">
            {translate("appointments.table_headings.customer")}
          </span>
        </div>
        <div>
          <span className="font-semibold text-xs md:text-sm xl:text-base text-white  hidden md:flex">
            {translate("appointments.table_headings.company_name")}
          </span>
          <span className="font-semibold text-xs md:text-sm xl:text-base text-white flex md:hidden truncate">
            {translate("appointments.table_headings.company_name").slice(0, 10)}
            ..
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-xs md:text-sm xl:text-base text-white">
            {translate("appointments.table_headings.date")}/
            {translate("appointments.table_headings.time")}
          </span>
        </div>

        <div>
          <span className="font-semibold text-xs md:text-sm xl:text-base text-white">
            {translate("appointments.table_headings.canton")}
          </span>
        </div>
        <div>
          <span className="font-semibold text-xs md:text-sm xl:text-base text-white">
            {translate("appointments.table_headings.offer_status")}
          </span>
        </div>
        {/* <div className="w-fit"> */}
        <span className="font-semibold text-xs md:text-sm xl:text-base text-white">
          {translate("common.actions")}
        </span>
        {/* </div> */}
      </div>
      {/* {isAgent ? (
        <>
          <div className="mlg:hidden">
            <div
              className={`gap-x-1 bg-primary rounded-lg pl-4 pr-1 py-4 grid items-center xs:grid-cols-[minmax(80px,100%)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(170px,170px)] xAir:grid-cols-[minmax(80px,80%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(170px,170px)]`}
            >
              <span className="font-semibold text-base text-white">
                {translate("appointments.table_headings.customer")}
              </span>
              <span className="font-semibold text-base text-white hidden xAir:block">
                {translate("appointments.table_headings.date")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("appointments.table_headings.time")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("appointments.table_headings.canton")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("common.actions")}
              </span>
            </div>
          </div>
        </>
      ) : null}

      <div className={`${isAgent ? "hidden mlg:flex" : "flex"}`}>
        <div className="mlg:w-full">
          <div
            className={`items-center gap-x-4 bg-primary rounded-l-lg pl-4 pr-1 py-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px)_minmax(200px,3fr)_minmax(250px,_3fr)_minmax(150px,_150px)_minmax(150px,150px)_minmax(180px,_180px)_minmax(160px,_160px)] mlg:grid-cols-[minmax(65px,_65px)_minmax(80px,_100%)_minmax(170px,_170px)_minmax(160px,_160px)] xlg:grid-cols-[minmax(65px,_65px)_minmax(60px,_4fr)_minmax(170px,_170px)_minmax(160px,_160px)] maxSize:grid-cols-[minmax(65px,_65px)_minmax(80px,_3fr)_minmax(100px,_4fr)_minmax(170px,_170px)_minmax(160px,_160px)] xMaxSize:grid-cols-[minmax(65px,_65px)_minmax(130px,_130px)_minmax(140px,_100%)_minmax(90px,_90px)_minmax(170px,_170px)_minmax(160px,_160px)] xLarge:grid-cols-[minmax(65px,_65px)_minmax(60px,_3fr)_minmax(70px,_4fr)_minmax(90px,_90px)_minmax(110px,_110px)_minmax(170px,_170px)_minmax(160px,_160px)]`}
          >
            <span className="font-semibold text-base text-white">
              {translate("appointments.table_headings.lead_id")}
            </span>
            <span className="font-semibold text-base text-white">
              {translate("appointments.table_headings.customer")}
            </span>

            <span className="font-semibold text-base text-white ] mlg:hidden maxSize:block">
              {translate("appointments.table_headings.company_name")}
            </span>
            <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
              {translate("appointments.table_headings.date")}
            </span>
            <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
              {translate("appointments.table_headings.time")}
            </span>
            <span className="font-semibold text-base text-white">
              {translate("appointments.table_headings.canton")}
            </span>
            <span className="font-semibold text-base text-white">
              {translate("appointments.table_headings.offer_status")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(180px,_180px)] maxLarge:grid-cols-[minmax(40px,_40px)_minmax(40px,_40px)_minmax(180px,_180px)] gap-x-2 bg-primary rounded-r-md py-4">
          <span className="font-semibold text-base text-white">
            {translate("common.actions")}
          </span>
        </div>
      </div> */}
    </div>
  );
};
