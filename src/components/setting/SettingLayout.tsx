import { detailScreenCardsLayout } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";

const SettingLayout = ({
  children,
  containerClassName,
}: detailScreenCardsLayout) => {
  const defaultClasses = `w-full h-fit`;
  const containerClasses = combineClasses(defaultClasses, containerClassName);
  return <div className={containerClasses}>{children}</div>;
};

export default SettingLayout;
