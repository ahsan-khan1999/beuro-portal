import { detailScreenCardsLayout } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";

const FormCard = ({
  children,
  containerClassName,
}: detailScreenCardsLayout) => {
  const defaultClasses = combineClasses(
    "rounded-md bg-white py-[26px] pl-[32px] pr-[25px] border border-primary w-full h-full",
    containerClassName
  );
  return <div className={defaultClasses}>{children}</div>;
};

export default FormCard;
