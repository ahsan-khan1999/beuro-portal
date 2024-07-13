import Image from "next/image";
import React from "react";
import emptyDataIcon from "@/assets/pngs/empty_state_icon.png";
import { useTranslation } from "next-i18next";
import { combineClasses } from "@/utils/utility";

export interface EmptyDataStateProps {
  className?: string;
  containerClassName?: string;
  imgClassName?: string;
  textClassName?: string;
}

export default function NoDataEmptyState({
  className,
  containerClassName,
  imgClassName,
  textClassName,
}: EmptyDataStateProps) {
  const { t: translate } = useTranslation();

  const defaultClasses = combineClasses(
    "py-10 px-6 bg-[#EDF4FF] rounded-3xl w-[525px]",
    className
  );

  const containerClasses = combineClasses(
    "flex items-center justify-center bg-white py-[153px]",
    containerClassName
  );

  const imgClasses = combineClasses("w-fit h-fit", imgClassName);
  const textClasses = combineClasses(
    "text-[#222B45] font-normal text-2xl",
    textClassName
  );

  return (
    <div className={containerClasses}>
      <div className={defaultClasses}>
        <div className="flex flex-col gap-y-4 items-center">
          <Image src={emptyDataIcon} alt="empty state" className={imgClasses} />
          <h1 className={textClasses}>{translate("empty_state.heading")}</h1>
          <p className="text-[#909090] text-sm font-normal text-center">
            {translate("empty_state.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
