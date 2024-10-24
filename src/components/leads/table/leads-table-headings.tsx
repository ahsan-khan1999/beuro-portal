import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import React from "react";

export const LeadsTableHeadings = ({ isAgent }: { isAgent?: boolean }) => {
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      {isAgent ? (
        <div className="mlg:hidden">
          <div
            className={`bg-primary rounded-lg pl-4 pr-1 py-4 gap-x-1 grid items-center xs:grid-cols-[minmax(65px,_65px)_minmax(80px,100%)_minmax(100px,100%)_minmax(140px,_140px)] xAir:grid-cols-[minmax(65px,_65px)_minmax(80px,100%)_minmax(100px,100%)_minmax(140px,_140px)]`}
          >
            <span className="font-semibold text-base text-white">
              {translate("leads.table_headings.id")}
            </span>
            <span className="font-semibold text-base text-white">
              {translate("appointments.table_headings.customer")}
            </span>
            <span className="font-semibold text-base text-white block mlg:hidden maxSize:block">
              {translate("leads.table_headings.email")}
            </span>
            <span className="font-semibold text-base text-white">
              {translate("leads.table_headings.appointment_1")}
            </span>
          </div>
        </div>
      ) : null}

      <div className={`${isAgent ? "hidden mlg:flex" : "flex"}`}>
        <div className="mlg:w-full">
          {user?.company?.isAppointment ? (
            <div
              className={`items-center gap-x-2 bg-primary rounded-l-lg pl-4 pr-1 py-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(220px,4fr)_minmax(300px,_3fr)_minmax(200px,200px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(180px,_180px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(170px,_170px)_minmax(120px,_120px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(150px,_150px)_minmax(170px,_170px)_minmax(120px,_120px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_3fr)_minmax(100px,_4fr)_minmax(150px,_150px)_minmax(170px,_170px)_minmax(120px,_120px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(150px,_150px)_minmax(170px,_170px)_minmax(120px,_120px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(120px,_120px)] maxLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(150px,_150px)_minmax(170px,_170px)]`}
            >
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.id")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.name")}
              </span>
              <span className="font-semibold text-base text-white block mlg:hidden maxSize:block">
                {translate("leads.table_headings.email")}
              </span>
              <span className="font-semibold text-base text-white mlg:hidden maxLarge:block">
                {translate("leads.table_headings.phone")}
              </span>
              <span className="font-semibold text-base text-white mlg:hidden xlg:block">
                {translate("leads.table_headings.creation_date")}
              </span>
              <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
                {translate("leads.table_headings.postal_code")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.status")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.appointment_1")}
              </span>
            </div>
          ) : (
            <div
              className={`items-center gap-x-4 bg-primary rounded-l-lg pl-4 pr-1 py-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(250px,4fr)_minmax(300px,_3fr)_minmax(200px,200px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(180px,_180px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(170px,_170px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(150px,_150px)_minmax(170px,_170px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_3fr)_minmax(100px,_4fr)_minmax(150px,_150px)_minmax(170px,_170px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(150px,_150px)_minmax(170px,_170px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)] maxLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)]`}
            >
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.id")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.name")}
              </span>
              <span className="font-semibold text-base text-white block mlg:hidden maxSize:block">
                {translate("leads.table_headings.email")}
              </span>
              <span className="font-semibold text-base text-white mlg:hidden maxLarge:block">
                {translate("leads.table_headings.phone")}
              </span>
              <span className="font-semibold text-base text-white mlg:hidden xlg:block">
                {translate("leads.table_headings.creation_date")}
              </span>
              <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
                {translate("leads.table_headings.location")}
              </span>
              <span className="font-semibold text-base text-white">
                {translate("leads.table_headings.status")}
              </span>
            </div>
          )}
        </div>

        <div
          className={`grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] bg-primary rounded-r-md py-4`}
        >
          <span className="font-semibold text-base text-white flex items-center justify-center pl-5">
            {translate("common.actions")}
          </span>
        </div>
      </div>
    </div>
  );
};
