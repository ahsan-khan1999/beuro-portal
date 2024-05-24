import { detailScreenCardsLayout } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";

const FormCard = ({
  children,
  containerClassName,
}: detailScreenCardsLayout) => {
  const defaultClasses = combineClasses(
    "rounded-lg bg-white w-full h-full",
    containerClassName
  );
  return <div className={defaultClasses}>{children}</div>;
};

export default FormCard;
