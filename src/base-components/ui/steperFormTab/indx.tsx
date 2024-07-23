import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import arrowIcon from "@/assets/pngs/right-arrow.png";

export interface StepFormTabProps {
  containerClassName?: string;
  textClassName?: string;
  mainClassName?: string;
  step?: string;
  heading?: string;
  isActive?: boolean;
  onClick?: () => void;
  showArrow?: boolean;
}

export const SteperFormTab = ({
  containerClassName,
  textClassName,
  mainClassName,
  heading,
  step,
  isActive,
  onClick,
  showArrow,
}: StepFormTabProps) => {
  const mainDefaultClasses = combineClasses(
    "flex items-center gap-x-4",
    mainClassName
  );

  const defaultClasses = combineClasses(
    `
    cursor-pointer px-3 py-[10px] rounded-[40px] bg-white border flex items-center gap-x-3 w-fit
    ${isActive ? "border-primary" : "border-gray-300"}
  `,
    containerClassName
  );

  const defaultTextClasses = combineClasses(
    `
    text-base font-medium
    ${isActive ? "text-primary" : "text-[#616161]"}
  `,
    textClassName
  );

  return (
    <div className={mainDefaultClasses} onClick={onClick}>
      <div className={defaultClasses}>
        <span className={defaultTextClasses}>{step}</span>
        <span className={defaultTextClasses}>{heading}</span>
      </div>
      {showArrow && <Image src={arrowIcon} alt="arrow icon" />}
    </div>
  );
};
