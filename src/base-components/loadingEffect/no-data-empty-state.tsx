import Image from "next/image";
import React from "react";
import emptyDataIcon from "@/assets/pngs/empty_state_icon.png";
import { useTranslation } from "next-i18next";
import { combineClasses } from "@/utils/utility";
import { Button } from "../ui/button/button";

export interface EmptyDataStateProps {
  className?: string;
  containerClassName?: string;
  imgClassName?: string;
  textClassName?: string;
  heading?: string;
  subHeading?: string;
  isButton?: boolean;
  onButtonClick?: () => void;
  buttonHeading?: string;
}

export default function NoDataEmptyState({
  className,
  containerClassName,
  imgClassName,
  textClassName,
  heading,
  subHeading,
  isButton,
  onButtonClick,
  buttonHeading,
}: EmptyDataStateProps) {
  const { t: translate } = useTranslation();

  const defaultClasses = combineClasses(
    "py-10 px-6 bg-[#E5EFFF] rounded-3xl xMini:w-[525px]",
    className
  );

  const containerClasses = combineClasses(
    "xMini:flex items-center justify-center bg-white py-[153px] px-3 xMini:px-0",
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
          <h1 className={textClasses}>
            {heading || translate("empty_state.heading")}
          </h1>
          <p className="text-[#909090] text-sm font-normal text-center">
            {subHeading || translate("empty_state.description")}
          </p>
          {isButton && (
            <Button
              inputType="button"
              onClick={onButtonClick}
              className="!h-fit py-2 px-3 flex items-center text-sm font-medium xMini:font-semibold bg-primary text-white rounded-md whitespace-nowrap w-fit"
              text={buttonHeading}
              id="submit reports"
              iconAlt="submit reports"
            />
          )}
        </div>
      </div>
    </div>
  );
}
