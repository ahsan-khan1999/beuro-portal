import { combineClasses } from "@/utils/utility";

export interface DetailDivProps {
  value?: string | number;
  containerClassName?: string;
}

export const DetailDiv = ({ value, containerClassName }: DetailDivProps) => {
  const defaultClasses = combineClasses(
    "rounded-lg border border-[#EBEBEB] bg-white px-4 py-[6px] xMini:py-4 min-h-[40px] xMini:min-h-[58px] text-[#4B4B4B] font-medium truncate",
    containerClassName
  );
  return <div className={defaultClasses}>{value}</div>;
};
