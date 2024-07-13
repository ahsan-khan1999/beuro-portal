import { CardProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";
export const Card = React.memo(({ className, children }: CardProps) => {
  const defaultClasses =
    "flex flex-col items-center bg-white max-w-[572px] shadow-[0px_3px_20px_#0000001A] rounded-2xl p-[50px]";
  const classes = combineClasses(defaultClasses, className);
  return (
    <div className="flex justify-center items-center">
      <div className={`${classes}`}>{children}</div>
    </div>
  );
});
