import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import arrowIcon from "@/assets/pngs/right-arrow.png";

export interface StepFormTabProps {
  containerClassName?: string;
  textClassName?: string;
  mainClassName?: string;
  index: number;
  heading?: string | any;
  showArrow?: boolean;
  setTabType: (tabType: number) => void;
  tabType: number;
  isSelected: boolean;
  selectedTab: number;
  onItemSelected?: (id: string) => void;
  isToggle?: boolean;
  onClick: () => void;
}

export const SteperFormTab = ({
  setTabType,
  isSelected,
  selectedTab,
  onItemSelected,
  containerClassName,
  heading,
  mainClassName,
  showArrow,
  index,
  textClassName,
  isToggle,
  onClick,
}: StepFormTabProps) => {
  const mainDefaultClasses = combineClasses(
    "flex items-center gap-x-4",
    mainClassName
  );

  const defaultClasses = combineClasses(
    `
    cursor-pointer px-3 py-[10px] rounded-[40px] bg-white border flex items-center gap-x-3 w-fit
    ${isSelected ? "border-primary" : "border-gray-300"}
  `,
    containerClassName
  );

  const defaultTextClasses = combineClasses(
    `
    text-base font-medium
    ${isSelected ? "text-primary" : "text-[#616161]"}
  `,
    textClassName
  );

  return (
    <button onClick={onClick} className={mainDefaultClasses}>
      <div className={defaultClasses}>
        <span className={defaultTextClasses}>{index}</span>
        <span className={defaultTextClasses}>{heading}</span>
      </div>
      {showArrow && <Image src={arrowIcon} alt="arrow icon" />}
    </button>
  );
};
