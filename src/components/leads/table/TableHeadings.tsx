import { useTranslation } from "next-i18next";
import React from "react";

const TableHeadings = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex">
      <div className="mlg:w-full">
        <div
          className={`items-center gap-x-4 bg-primary rounded-l-lg pl-4 py-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(400px,4fr)_minmax(300px,_3fr)_minmax(150px,150px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(170px,_170px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(50px,_4fr)_minmax(130px,_130px)_minmax(190px,_190px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_4fr)_minmax(130px,_130px)_minmax(190px,_190px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(190px,_190px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(190px,_190px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(190px,_190px)]`}

          // className="xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(400px,4fr)_minmax(300px,_3fr)_minmax(150px,150px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(170px,_170px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px)_minmax(50px,_4fr)_minmax(130px,_130px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(50px,_50px)_minmax(80px,_4fr)_minmax(130px,_130px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(50px,_50px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(50px,_50px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(70px,4fr)_minmax(70px,_3fr)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] gap-x-4 pt-2 pb-5"
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
          <span className="font-semibold text-base text-white mlg:hidden xLarge:block">
            {translate("leads.table_headings.phone")}
          </span>
          <span className="font-semibold text-base text-white">
            {translate("leads.table_headings.creation_date")}
          </span>
          <span className="font-semibold text-base text-white mlg:hidden xMaxSize:block">
            {translate("leads.table_headings.location")}
          </span>

          <span className="font-semibold text-base text-white">
            {translate("leads.table_headings.status")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] bg-primary rounded-r-md py-4">
        <span className="font-semibold text-base text-white flex items-center justify-center">
          {translate("common.actions")}
        </span>
      </div>
    </div>
  );

  {
    /* <span className="font-semibold text-base text-white flex items-center justify-center">
        {translate("leads.table_headings.note")}
      </span>
      <span className="font-semibold text-base text-white flex items-center justify-center">
        {translate("leads.table_headings.edit")}
      </span> */
  }
};

export default TableHeadings;
