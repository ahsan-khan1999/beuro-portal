import React from "react";
import ColumnsComp from "./ColumnsComp";
import { useTranslation } from "next-i18next";

const Templates = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <div className="border border-[#EBEBEB] rounded-md bg-white pl-[32px] pr-[45px] py-3 w-full h-fit flex justify-between items-center">
        <span className="text-base font-medium text-[#4B4B4B]">
          {translate("setting.templates.heading")}
        </span>

        <button className="text-white font-medium text-base rounded-lg bg-[#4A13E7] xl:px-[42px] px-4 py-2">
         {translate("setting.templates.change_button")}
        </button>
      </div>

      <div className="mt-3">
        <ColumnsComp />
      </div>
    </>
  );
};

export default Templates;
