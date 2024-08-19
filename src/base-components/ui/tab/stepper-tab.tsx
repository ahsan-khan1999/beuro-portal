import { combineClasses } from "@/utils/utility";
import React from "react";

export interface MobileStepperTabProps {
  setTabType: (tabType: number) => void;
  tabType: number;
  isSelected: boolean;
  selectedTab: number;
  name: string;
  onItemSelected?: (id: string) => void;
  containerClassName?: string;
  textClassName?: string;
  defaultClassName?: string;
  index?: number;
}

export const MobileStepperTab = ({
  name,
  setTabType,
  isSelected,
  selectedTab,
  onItemSelected,
  tabType,
  containerClassName,
  textClassName,
  defaultClassName,
  index,
}: MobileStepperTabProps) => {
  const handleClickScroll = (name: string) => {
    onItemSelected && onItemSelected(name);
    setTabType(selectedTab);
  };

  const defaultClasses = combineClasses(
    "flex flex-col items-center gap-y-4",
    defaultClassName
  );

  const tabContainerClasses = combineClasses(
    `p-3 w-[36px] h-[36px] rounded-full cursor-pointer flex items-center justify-center ${
      isSelected ? "bg-[#4A13E7] " : "bg-[#B9B9B9]"
    }`,
    containerClassName
  );

  const textClasses = combineClasses(
    `${
      isSelected ? "text-primary" : "text-[#272727]"
    } text-xs font-medium text-center`,
    textClassName
  );

  return (
    <div className={defaultClasses}>
      <div className={containerClassName}>
        <div
          className={tabContainerClasses}
          onClick={() => handleClickScroll(name)}
        >
          <span className="text-white font-normal text-base"> {index}</span>
        </div>
        <span></span>
      </div>
      <span className={textClasses}>{name}</span>
    </div>
  );
};
