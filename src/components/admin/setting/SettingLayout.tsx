import { detailScreenCardsLayout } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";

const SettingLayout = ({
  children,
  containerClassName,
}: detailScreenCardsLayout) => {
  const defaultClasses = combineClasses(
    "border border-[#EBEBEB] rounded-md bg-white pl-[30px] pr-4 py-3 w-full h-fit",
    containerClassName
  );

  return <div className={defaultClasses}>{children}</div>;
};

export default SettingLayout;
